import { UserRepository } from '../repository/user.repository';
import FindManyUsersHandler from './find-many-users/find-many-users.handler';
import FindUserByEmailHandler from './find-user-by-email/find-user-by-email.handler';
import FindUserByIdHandler from './find-user-by-id/find-user-by-id.handler';

export const UserQueryHandlers = [
  {
    provide: FindManyUsersHandler,
    useFactory: (userRepository: UserRepository) => {
      return new FindManyUsersHandler(userRepository);
    },
    inject: [UserRepository],
  },
  {
    provide: FindUserByEmailHandler,
    useFactory: (userRepository: UserRepository) => {
      return new FindUserByEmailHandler(userRepository);
    },
    inject: [UserRepository],
  },
  {
    provide: FindUserByIdHandler,
    useFactory: (userRepository: UserRepository) => {
      return new FindUserByIdHandler(userRepository);
    },
    inject: [UserRepository],
  },
];
