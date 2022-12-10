import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserModel } from './repository/user.model';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import User from './User';
import { CreateUserInput } from './repository/user.args';
// import { CreateUserCommand } from './commands/create-user/create-user.command';
// import { User, UserArgs } from './repository/user.schema';
// import { GetUserByIdQuery } from './queries/get-user-by-id/get-user-by-id.query';
// import { GetUserByEmailQuery } from './queries/get-user-by-email/get-user-by-email.query';
// import { IsPublic } from 'src/common/decorators/isPublic';

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

  @Query(() => UserModel, { name: 'user' })
  async findOne(@Args('email') email: string) {
    console.log(email);
    // return await this.queryBus.execute<GetUserByEmailQuery, User>(
    //   new GetUserByEmailQuery(email),
    // );
  }

  // @Query(() => UserModel, { name: 'getUserById' })
  // async findOneById(@Args('id') id: string) {
  //   return await this.queryBus.execute<GetUserByIdQuery, User>(
  //     new GetUserByIdQuery(id),
  //   );
  // }
}
