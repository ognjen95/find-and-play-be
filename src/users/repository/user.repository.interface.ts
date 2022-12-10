import { IBaseRepository } from 'src/database/baseRepositoryInterface';
import User from '../User';

export interface IUserRepository extends IBaseRepository<User> {
  createOne(dto: User): Promise<User>;
  // findOneByEmail(email: string): Promise<User>;
  // findOneById(id: string): Promise<User>;
}
