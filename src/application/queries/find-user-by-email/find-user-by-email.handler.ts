import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import User from 'src/domain/user/User';
import { FindUserByEmailQuery } from './find-user-by-email.query';

@QueryHandler(FindUserByEmailQuery)
class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ email }: { email: string }): Promise<User> {
    return this.userRepository.findOneByEmail(email);
  }
}

export default FindUserByEmailHandler;
