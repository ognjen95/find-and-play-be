import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/repository/common/base-repository';
import { EventSchemaFactory } from './event.schema.factory';
import { EventModel } from 'src/presentation/graphql/models/event.model';
import Event from 'src/domain/event/Event';

@Injectable()
export class EventRepository extends BaseRepository<EventModel, Event> {
  constructor(eventSchemaFactory: EventSchemaFactory) {
    super('event', eventSchemaFactory);
  }

  async createOne(event: Event): Promise<Event> {
    const data = this.entitySchemaFactory.create(event);

    const entityDocument = await this.prismaService.event.create({
      data: {
        image: '',
        ...data,
        location: {
          create: data.location,
        },
      },
      include: {
        location: true,
        participants: true,
      },
    });

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }
}
