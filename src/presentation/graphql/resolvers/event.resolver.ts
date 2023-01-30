import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventModel } from '../models/event.model';
import { CreateEventInput } from '../dtos/event/create-event-input.dto';
import { CreateEventCommand } from 'src/application/commands/event/create-event/create-event.command';
import { FindManyEventsQuery } from 'src/application/queries/event/find-many-events.ts/find-many-events.query';
import { QueryOptionsInput } from '../dtos/common/query-options.input';
import { UserHeader } from 'src/presentation/decorators/UserHeader';
import { CreateJoinRequestCommand } from 'src/application/commands/event/create-join-request/CreateJoinRequestCommand';
import { EventRequestModel } from '../models/eventRequest.model';
import { FindUsersEventsQuery } from 'src/application/queries/event/find-many-users-events.ts/find-users-events.query';
import { ApproveEventRequestCommand } from 'src/application/commands/event/approve-event-request/approve-event-request.command';

@Resolver(() => EventModel)
export class EventResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => EventModel, { name: 'createEvent' })
  async create(
    @UserHeader() userId: string,
    @Args('CreateEventInput') createEventDto: CreateEventInput,
  ) {
    return await this.commandBus.execute<CreateEventCommand, Event>(
      new CreateEventCommand(createEventDto, userId),
    );
  }

  @Query(() => [EventModel], { name: 'getManyEvents' })
  async findMany(
    @Args('QueryOptionsInput', { nullable: true })
    queryOptions?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindManyEventsQuery, Event>(
      new FindManyEventsQuery(queryOptions),
    );
  }

  @Query(() => [EventModel], { name: 'getUsersEvents' })
  async findUsersEvents(
    @UserHeader() userId: string,
    @Args('QueryOptionsInput', { nullable: true })
    queryOptions?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindUsersEventsQuery, Event>(
      new FindUsersEventsQuery(userId, queryOptions),
    );
  }

  @Mutation(() => EventRequestModel, {
    name: 'createJoinRequest',
    nullable: true,
  })
  async createJoinRequest(
    @UserHeader() userId: string,
    @Args('eventId') eventId: string,
  ) {
    return await this.commandBus.execute<CreateJoinRequestCommand, Event>(
      new CreateJoinRequestCommand(eventId, userId),
    );
  }

  @Mutation(() => EventRequestModel, {
    name: 'approveEventRequest',
    nullable: true,
  })
  async approveEventRequest(
    @UserHeader() userId: string,
    @Args('eventRequestId') eventRequestId: string,
  ) {
    return await this.commandBus.execute<ApproveEventRequestCommand, Event>(
      new ApproveEventRequestCommand(eventRequestId, userId),
    );
  }

  @Mutation(() => EventRequestModel, {
    name: 'deleteEventRequest',
    nullable: true,
  })
  async deleteJoinRequest(
    @UserHeader() userId: string,
    @Args('eventRequestId') eventRequestId: string,
  ) {
    return await this.commandBus.execute<CreateJoinRequestCommand, Event>(
      new CreateJoinRequestCommand(eventRequestId, userId),
    );
  }
}
