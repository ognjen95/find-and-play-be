import User from '../User';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/baseRepository';
import { UserModel } from './user.model';
import { UserSchemaFactory } from './user.schema.factory';

@Injectable()
export class UserRepository extends BaseRepository<UserModel, User> {
  constructor(userSchemaFactory: UserSchemaFactory) {
    super('user', userSchemaFactory);
  }

  async createOne(user: User): Promise<User> {
    const data = this.entitySchemaFactory.create(user);

    const entityDocument = await this.prismaService[this.tableName].create({
      data: {
        ...user,
        location: {
          create: data.location,
        },
      },
    });

    return entityDocument;
  }

  // async findOneByEmail(email: string): Promise<User> {
  //   const entityDocument = await this.prismaService[this.tableName].findUnique({
  //     where: { email },
  //     include: {
  //       votes: {
  //         select: { id: true, movieId: true, user: true, userId: true },
  //       },
  //     },
  //   });

  //   if (!entityDocument) {
  //     this.notFoundError();
  //   }

  //   return entityDocument;
  // }

  // async findOneById(id: string): Promise<User> {
  //   return this.findById(id);
  // }
}
