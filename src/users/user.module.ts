import { Module } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { UserCommandHandlers } from './commands';
import { UserQueryHandlers } from './queries';
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
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    // ...EventHandlers,
  ],
})
export class UsersModule {}
