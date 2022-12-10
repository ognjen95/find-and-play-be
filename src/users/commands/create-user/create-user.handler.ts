import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/users/repository/user.repository.interface';
import { CreateUserCommand } from './create-user.command';
import { v4 as uuid } from 'uuid';
import User from 'src/users/User';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ dto }: CreateUserCommand): Promise<User> {
    const { firstName, lastName, email, description, sports, location } = dto;

    return await this.userRepository.createOne(
      new User(
        uuid(),
        firstName,
        lastName,
        email,
        description,
        sports,
        location,
      ),
    );
  }
}

export default CreateUserHandler;
