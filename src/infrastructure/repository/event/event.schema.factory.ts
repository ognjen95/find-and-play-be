import { Injectable } from '@nestjs/common';
import Event from 'src/domain/event/Event';
import { EntitySchemaFactory } from 'src/infrastructure/repository/common/model-schema.factory';
import { EventModel } from 'src/presentation/graphql/models/event.model';

@Injectable()
export class EventSchemaFactory
  implements EntitySchemaFactory<EventModel, Event>
{
  create(event: Event): EventModel {
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
  }: EventModel): Event {
    return new Event(
      id,
      name,
      startTime,
      endTime,
      description,
      sports,
      location,
    );
  }
}
