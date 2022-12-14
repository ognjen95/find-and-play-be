import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/users/repository/user.repository.interface';
import User from 'src/users/User';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.findManyUsers();
  }
}

export default FindManyUsersHandler;
