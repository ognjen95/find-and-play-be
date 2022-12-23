import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import User from 'src/domain/user/User';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ queryOptions }: FindManyUsersQuery): Promise<User[]> {
    return this.userRepository.findManyUsers(queryOptions);
  }
}

export default FindManyUsersHandler;
