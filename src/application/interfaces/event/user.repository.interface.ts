import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';
import { IBaseRepository } from 'src/infrastructure/repository/common/base-repository.interface';
import Event from '../../../domain/Event/Event';

export interface IEventRepository extends IBaseRepository<Event> {
  createOne(dto: Event, creatorId: string): Promise<Event>;
  findManyEvents(queryOptions?: QueryOptionsDto): Promise<Event[]>;
}
