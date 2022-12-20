import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/application/interfaces/event/user.repository.interface';
import Event from 'src/domain/event/Event';
import { FindManyEventsQuery } from './find-many-users.query';

@QueryHandler(FindManyEventsQuery)
class FindManyEventsHandler implements IQueryHandler<FindManyEventsQuery> {
  constructor(private readonly eventRepository: IEventRepository) {}

  execute(): Promise<Event[]> {
    return this.eventRepository.findManyEvents();
  }
}

export default FindManyEventsHandler;
