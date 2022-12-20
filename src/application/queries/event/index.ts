import { EventRepository } from 'src/infrastructure/repository/event/event.repository';
import FindManyEventsHandler from './find-many-events.ts/find-many-users.handler';

export const EventQueryHandlers = [
  {
    provide: FindManyEventsHandler,
    useFactory: (eventRepository: EventRepository) => {
      return new FindManyEventsHandler(eventRepository);
    },
    inject: [EventRepository],
  },
];
