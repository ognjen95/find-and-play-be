import { Module } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { EventCommandHandlers } from 'src/application/commands/event';
import { EventQueryHandlers } from 'src/application/queries/event';
import { EventRepository } from 'src/infrastructure/repository/event/event.repository';
import { EventSchemaFactory } from 'src/infrastructure/repository/event/event.schema.factory';
import { UserRepository } from 'src/infrastructure/repository/user/user.repository';
import { UserSchemaFactory } from 'src/infrastructure/repository/user/user.schema.factory';
import { EventResolver } from '../resolvers/event.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    EventPublisher,
    EventRepository,
    UserRepository,
    UserSchemaFactory,
    EventResolver,
    EventSchemaFactory,
    ...EventCommandHandlers,
    ...EventQueryHandlers,
    // ...EventHandlers,
  ],
})
export class EventsModule {}
