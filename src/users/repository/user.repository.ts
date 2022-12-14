import User from '../User';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base-repository';
import { UserModel } from './user.model';
import { UserSchemaFactory } from './user.schema.factory';

@Injectable()
export class UserRepository extends BaseRepository<UserModel, User> {
  constructor(userSchemaFactory: UserSchemaFactory) {
    super('user', userSchemaFactory);
  }

  async createOne(user: User): Promise<User> {
    const data = this.entitySchemaFactory.create(user);

    const entityDocument = await this.prismaService.user.create({
      data: {
        ...data,
        location: {
          create: data.location,
        },
      },
      include: {
        location: true,
      },
    });

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  async findManyUsers(): Promise<User[]> {
    const entityDocument = await this.prismaService.user.findMany({
      include: {
        location: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return entityDocument.map((user) =>
      this.entitySchemaFactory.createFromSchema(user),
    );
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const entityDocument = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        location: true,
      },
    });

    if (!entityDocument) return null;

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  async findOneById(id: string): Promise<User | null> {
    const entityDocument = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });

    if (!entityDocument) return null;

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }
}
