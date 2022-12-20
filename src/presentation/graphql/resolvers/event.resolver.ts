import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventModel } from '../models/event.model';
import { CreateEventInput } from '../dtos/event/create-event-input.dto';
import { CreateEventCommand } from 'src/application/commands/event/create-event/create-event.command';
import { FindManyEventsQuery } from 'src/application/queries/event/find-many-events.ts/find-many-users.query';

@Resolver(() => EventModel)
export class EventResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => EventModel, { name: 'createEvent' })
  async create(@Args('CreateEventInput') createEventDto: CreateEventInput) {
    return await this.commandBus.execute<CreateEventCommand, Event>(
      new CreateEventCommand(createEventDto),
    );
  }

  @Query(() => [EventModel], { name: 'getManyEvents' })
  async findMany() {
    return await this.queryBus.execute<FindManyEventsQuery, Event>(
      new FindManyEventsQuery(),
    );
  }
}
