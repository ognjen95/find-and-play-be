import User from '../../../domain/user/User';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/repository/common/base-repository';
import { UserModel } from '../../../presentation/graphql/models/user.model';
import { UserSchemaFactory } from './user.schema.factory';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';

@Injectable()
export class UserRepository
  extends BaseRepository<UserModel, User>
  implements IUserRepository
{
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

  async findManyUsers(queryOptions?: QueryOptionsDto): Promise<User[]> {
    const { search, paginationOptions } = queryOptions || {};
    const { take, skip, orderBy } = paginationOptions || {};

    const entityDocument = await this.prismaService.user.findMany({
      take,
      skip,
      where: {
        OR: [
          {
            firstName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            location: {
              city: {
                contains: search,
                mode: 'insensitive',
              },
              state: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        location: true,
      },
      orderBy: [
        {
          createdAt: orderBy ?? 'desc',
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
