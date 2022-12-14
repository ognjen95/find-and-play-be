import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/users/repository/user.repository.interface';
import User from 'src/users/User';
import { FindUserByIdQuery } from './find-user-by-id.query';

@QueryHandler(FindUserByIdQuery)
class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ id }: { id: string }): Promise<User> {
    return this.userRepository.findById(id);
  }
}

export default FindUserByIdHandler;
