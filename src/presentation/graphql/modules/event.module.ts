import { Module } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { EventCommandHandlers } from 'src/application/commands/event';
import { EventRepository } from 'src/infrastructure/repository/event/event.repository';
import { EventSchemaFactory } from 'src/infrastructure/repository/event/event.schema.factory';
import { EventResolver } from '../resolvers/event.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    EventPublisher,
    EventRepository,
    EventResolver,
    EventSchemaFactory,
    ...EventCommandHandlers,
    // ...EventQueryHandlers,
    // ...EventHandlers,
  ],
})
export class EventsModule {}
