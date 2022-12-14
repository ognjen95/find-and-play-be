import { UserRepository } from '../repository/user.repository';
import CreateUserHandler from './create-user/create-user.handler';

export const UserCommandHandlers = [
  {
    provide: CreateUserHandler,
    useFactory: (userRepository: UserRepository) => {
      return new CreateUserHandler(userRepository);
    },
    inject: [UserRepository],
  },
];
