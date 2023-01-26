import { Injectable } from '@nestjs/common';
import Event from 'src/domain/event/Event';
import { EventRequest } from 'src/domain/event/EventRequest';
import { EntitySchemaFactory } from 'src/infrastructure/repository/common/model-schema.factory';
import { EventModel } from 'src/presentation/graphql/models/event.model';
import { UserSchemaFactory } from '../user/user.schema.factory';

@Injectable()
export class EventSchemaFactory
  implements EntitySchemaFactory<EventModel, Event>
{
  constructor(private userSchemaFactory: UserSchemaFactory) {}

  create(event: Event): EventModel {
    const participants = event.getParticipants();

    return {
      id: event.getId(),
      name: event.getName(),
      startTime: event.getStartTime(),
      endTime: event.getEndTime(),
      description: event.getDescription(),
      sports: event.getSports(),
      location: event.getLocation(),
      image: event.getImage(),
      createdAt: event.getCreatedAt(),
      participants: participants.map((participant) =>
        this.userSchemaFactory.create(participant),
      ),
    };
  }

  createFromSchema({
    id,
    name,
    startTime,
    endTime,
    description,
    sports,
    location,
    participants,
    createdAt,
    admins,
    eventRequests,
  }: EventModel): Event {
    const event = new Event(
      id,
      name,
      startTime,
      endTime,
      description,
      sports,
      location,
    );

    event._createdAt = createdAt;

    if (participants?.length) {
      participants.forEach((participant) =>
        event.addParticipant(
          this.userSchemaFactory.createFromSchema(participant),
        ),
      );
    }

    if (admins?.length) {
      const adminArray = [];

      admins.forEach((admin) =>
        adminArray.push(this.userSchemaFactory.createFromSchema(admin)),
      );

      event._addAdmins = adminArray;
    }

    if (eventRequests?.length) {
      const eventRequestsArr = [];

      eventRequests.forEach((event) =>
        eventRequestsArr.push(
          new EventRequest(event.id, event.eventId, event.userId),
        ),
      );

      event._eventRequests = eventRequestsArr;
    }

    return event;
  }
}
