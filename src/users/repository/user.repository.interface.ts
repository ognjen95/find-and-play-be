import { IBaseRepository } from 'src/database/base-repository.interface';
import User from '../User';

export interface IUserRepository extends IBaseRepository<User> {
  createOne(dto: User): Promise<User>;
  findManyUsers(): Promise<User[]>;
  findOneByEmail(email: string): Promise<User>;
  findOneById(id: string): Promise<User>;
}
