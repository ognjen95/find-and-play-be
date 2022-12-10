import { Module } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { CommandHandlers } from './commands';
import { UserRepository } from './repository/user.repository';
import { UserSchemaFactory } from './repository/user.schema.factory';
import { UserResolver } from './user.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    EventPublisher,
    UserRepository,
    UserResolver,
    UserSchemaFactory,
    ...CommandHandlers,
    // ...QueryHandlers,
    // ...EventHandlers,
  ],
})
export class UsersModule {}
