import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/application/interfaces/event/event.repository.interface';
import Event from 'src/domain/event/Event';
import { FindUsersEventsQuery } from './find-users-events.query';

@QueryHandler(FindUsersEventsQuery)
class FindUsersEventsHandler implements IQueryHandler<FindUsersEventsQuery> {
  constructor(private readonly eventRepository: IEventRepository) {}

  execute({ userId, queryOptions }: FindUsersEventsQuery): Promise<Event[]> {
    return this.eventRepository.findUsersEvents(userId, queryOptions);
  }
}

export default FindUsersEventsHandler;
