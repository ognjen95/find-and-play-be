export interface IBaseRepository<TEntity> {
  create(dto: TEntity): Promise<TEntity>;
  findAll(): Promise<TEntity[]>;
  findById(id: string): Promise<TEntity>;
  notFoundError(): void;
}
