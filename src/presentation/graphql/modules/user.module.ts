import { Module } from '@nestjs/common';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { UserCommandHandlers } from '../../../application/commands/user';
import { UserQueryHandlers } from '../../../application/queries/user';
import { UserRepository } from '../../../infrastructure/repository/user/user.repository';
import { UserSchemaFactory } from '../../../infrastructure/repository/user/user.schema.factory';
import { UserResolver } from '../resolvers/user.resolver';

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
