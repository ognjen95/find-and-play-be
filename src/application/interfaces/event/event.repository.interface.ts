import { QueryOptionsDto } from 'src/application/dtos/common/queryOptions.dto';
import { EventRequest } from 'src/domain/event/EventRequest';
import { IBaseRepository } from 'src/infrastructure/repository/common/base-repository.interface';
import Event from '../../../domain/Event/Event';

export interface IEventRepository extends IBaseRepository<Event> {
  createOne(dto: Event, creatorId: string): Promise<Event>;
  findManyEvents(queryOptions?: QueryOptionsDto): Promise<Event[]>;
  findOneById(eventId: string): Promise<Event>;
  joinRequest(
    eventRequest: EventRequest,
    admins?: { id: string }[],
  ): Promise<any>;
}
