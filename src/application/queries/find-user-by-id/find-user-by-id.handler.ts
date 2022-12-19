import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import User from 'src/domain/user/User';
import { FindUserByIdQuery } from './find-user-by-id.query';

@QueryHandler(FindUserByIdQuery)
class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ id }: { id: string }): Promise<User> {
    return this.userRepository.findById(id);
  }
}

export default FindUserByIdHandler;
