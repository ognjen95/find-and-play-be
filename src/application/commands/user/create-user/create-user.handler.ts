import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import { CreateUserCommand } from './create-user.command';
import { v4 as uuid } from 'uuid';
import User from 'src/domain/user/User';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ dto }: CreateUserCommand): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      description,
      sports,
      location,
      password,
    } = dto;

    const userExists = await this.userRepository.findOneByEmail(email);

    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    return await this.userRepository.createOne(
      new User(
        uuid(),
        firstName,
        lastName,
        email,
        password,
        description,
        sports,
        location,
      ),
    );
  }
}

export default CreateUserHandler;
