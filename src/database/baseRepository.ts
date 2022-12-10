import { Inject, NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { IBaseRepository } from './baseRepositoryInterface';
import { EntitySchemaFactory } from './EntitySchemaFactory';
import { IdentifiableEntitySchema } from './identifiableEntitySchema';
import { PrismaService } from './prisma.service';

export abstract class BaseRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> implements IBaseRepository<TEntity>
{
  @Inject()
  protected readonly prismaService: PrismaService;

  constructor(
    protected readonly tableName: string,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) {}

  async findAll(): Promise<TEntity[]> {
    const entityDocument = await this.prismaService[this.tableName].findMany();

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return entityDocument;
  }

  async findById(id: string): Promise<TEntity> {
    const entityDocument = await this.prismaService[this.tableName].findUnique({
      where: { id },
    });

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  async create(dto: TEntity): Promise<TEntity> {
    const newEntity = this.entitySchemaFactory.create(dto);

    const entityDocument = await this.prismaService[this.tableName].create({
      data: newEntity,
    });

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return entityDocument;
  }

  notFoundError() {
    throw new NotFoundException('Entity was not found.');
  }
}
