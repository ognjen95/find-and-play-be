import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/application/interfaces/event/event.repository.interface';
import Event from 'src/domain/event/Event';
import { FindManyEventsQuery } from './find-many-events.query';

@QueryHandler(FindManyEventsQuery)
class FindManyEventsHandler implements IQueryHandler<FindManyEventsQuery> {
  constructor(private readonly eventRepository: IEventRepository) {}

  execute({ queryOptions }: FindManyEventsQuery): Promise<Event[]> {
    return this.eventRepository.findManyEvents(queryOptions);
  }
}

export default FindManyEventsHandler;
