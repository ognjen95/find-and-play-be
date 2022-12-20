import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { EventModel } from '../models/event.model';
import { CreateEventInput } from '../dtos/event/create-event-input.dto';
import { CreateEventCommand } from 'src/application/commands/event/create-event/create-event.command';

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
    console.log('query');
  }
}
