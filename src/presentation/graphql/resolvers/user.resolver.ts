import User from '../../../domain/user/User';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserModel } from '../models/user.model';
import { CreateUserCommand } from '../../../application/commands/user/create-user/create-user.command';
import { CreateUserInput } from '../dtos/user/user-input.dto';
import { FindManyUsersQuery } from '../../../application/queries/find-many-users/find-many-users.query';
import { FindUserByEmailQuery } from '../../../application/queries/find-user-by-email/find-user-by-email.query';
import { FindUserByIdQuery } from '../../../application/queries/find-user-by-id/find-user-by-id.query';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => UserModel, { name: 'createUser' })
  async create(@Args('CreateUserInput') createUserDto: CreateUserInput) {
    return await this.commandBus.execute<CreateUserCommand, User>(
      new CreateUserCommand(createUserDto),
    );
  }

  @Query(() => [UserModel], { name: 'getManyUsers' })
  async findMany() {
    return await this.queryBus.execute<FindManyUsersQuery, User>(
      new FindManyUsersQuery(),
    );
  }

  @Query(() => UserModel, { name: 'getUserByEmail' })
  async findByEmail(@Args('email') email: string) {
    return await this.queryBus.execute<FindUserByEmailQuery, User>(
      new FindUserByEmailQuery(email),
    );
  }

  @Query(() => UserModel, { name: 'getUserById' })
  async findById(@Args('id') id: string) {
    return await this.queryBus.execute<FindUserByIdQuery, User>(
      new FindUserByIdQuery(id),
    );
  }
}
