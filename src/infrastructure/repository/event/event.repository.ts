import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/repository/common/base-repository';
import { EventSchemaFactory } from './event.schema.factory';
import { EventModel } from 'src/presentation/graphql/models/event.model';
import Event from 'src/domain/event/Event';
import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';
import { EventRequest } from 'src/domain/event/EventRequest';
import { plainToInstance } from 'class-transformer/';
import { IEventRepository } from 'src/application/interfaces/event/event.repository.interface';

@Injectable()
export class EventRepository
  extends BaseRepository<EventModel, Event>
  implements IEventRepository
{
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
        eventRequests: {},
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

    return plainToInstance(Event, entityDocument);
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

    const returnData = data.map((event) => plainToInstance(Event, event));

    return returnData;
  }

  async findUsersEvents(userId: string): Promise<Event[]> {
    const data = await this.prismaService.event.findMany({
      where: {
        // eventRequests: {
        //   some: {
        //     isApproved: {
        //       not: true,
        //     },
        //   },
        // },
        OR: [
          {
            participants: {
              some: {
                id: {
                  equals: userId,
                },
              },
            },
          },
          {
            admins: {
              some: {
                id: {
                  equals: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        location: true,
        eventRequests: {
          include: {
            requestFor: true,
            requestFrom: true,
          },
        },
        participants: {
          include: {
            location: true,
          },
        },
      },
      //   orderBy: [
      //     {
      //       createdAt: 'desc',
      //     },
      //   ],
    });

    return plainToInstance(Event, data);
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

    await this.prismaService.event.update({
      where: {
        id: data.eventId,
      },
      data: {
        participants: {
          connect: [{ id: data.userId }],
        },
      },
    });
  }

  async approveEventRequest(
    eventRequestId: string,
    userId: string,
  ): Promise<EventRequest> {
    const eventRequest = await this.prismaService.eventRequests.update({
      where: {
        id: eventRequestId,
      },
      data: {
        isApproved: true,
      },
    });

    return plainToInstance(EventRequest, eventRequest);
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
        eventRequests: {
          include: {
            requestFor: true,
            requestFrom: true,
          },
        },
      },
    });

    if (!entityDocument) return null;

    return plainToInstance(Event, entityDocument);
  }
}
