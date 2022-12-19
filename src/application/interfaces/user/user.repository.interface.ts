import { IBaseRepository } from 'src/infrastructure/repository/common/base-repository.interface';
import User from '../../../domain/user/User';

export interface IUserRepository extends IBaseRepository<User> {
  createOne(dto: User): Promise<User>;
  findManyUsers(): Promise<User[]>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: string): Promise<User>;
}
