import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/repository/common/base-repository';
import { EventSchemaFactory } from './event.schema.factory';
import { EventModel } from 'src/presentation/graphql/models/event.model';
import Event from 'src/domain/event/Event';
import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';
import { EventRequest } from 'src/domain/event/EventRequest';
import User from 'src/domain/user/User';

@Injectable()
export class EventRepository extends BaseRepository<EventModel, Event> {
  constructor(eventSchemaFactory: EventSchemaFactory) {
    super('event', eventSchemaFactory);
  }

  async createOne(event: Event, creatorId: string): Promise<Event> {
    const data = this.entitySchemaFactory.create(event);

    const entityDocument = await this.prismaService.event.create({
      data: {
        image: '',
        ...data,
        location: {
          create: data.location,
        },
        participants: {
          connect: [{ id: creatorId }],
        },
        admins: {
          connect: [{ id: creatorId }],
        },
        eventRequests: {
          connect: [],
        },
      },
      include: {
        location: true,
        participants: {
          include: {
            location: true,
          },
        },
        eventRequests: true,
      },
    });

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  async findManyEvents(queryOptions: QueryOptionsDto): Promise<Event[]> {
    const { search, paginationOptions } = queryOptions || {};
    const { take, skip, orderBy } = paginationOptions || {};

    const data = await this.prismaService.event.findMany({
      take,
      skip,
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            location: {
              city: {
                contains: search,
                mode: 'insensitive',
              },
              state: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        location: true,
        participants: {
          include: {
            location: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: orderBy ?? 'desc',
        },
      ],
    });

    const returnData = data.map((event) =>
      this.entitySchemaFactory.createFromSchema(event),
    );

    return returnData;
  }

  async joinRequest(eventRequest: EventRequest, adminsIds: [{ id: string }]) {
    const data = eventRequest.toObject;

    await this.prismaService.eventRequests.create({
      data: {
        ...data,
        requestFor: {
          connect: adminsIds,
        },
      },
      include: {
        requestFrom: true,
        requestFor: true,
      },
    });
  }

  async findOneById(eventId: string): Promise<Event> {
    const entityDocument = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        location: true,
        admins: true,
        participants: true,
        eventRequests: true,
      },
    });

    if (!entityDocument) return null;

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }
}
