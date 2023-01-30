import { EventRepository } from 'src/infrastructure/repository/event/event.repository';
import FindManyEventsHandler from './find-many-events.ts/find-many-events.handler';
import FindUsersEventsHandler from './find-many-users-events.ts/find-users-events.handler';

export const EventQueryHandlers = [
  {
    provide: FindManyEventsHandler,
    useFactory: (eventRepository: EventRepository) => {
      return new FindManyEventsHandler(eventRepository);
    },
    inject: [EventRepository],
  },
  {
    provide: FindUsersEventsHandler,
    useFactory: (eventRepository: EventRepository) => {
      return new FindUsersEventsHandler(eventRepository);
    },
    inject: [EventRepository],
  },
];
