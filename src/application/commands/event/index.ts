import { EventRepository } from 'src/infrastructure/repository/event/event.repository';
import CreateEventHandler from './create-event/create-event.handler';

export const EventCommandHandlers = [
  {
    provide: CreateEventHandler,
    useFactory: (eventRepository: EventRepository) => {
      return new CreateEventHandler(eventRepository);
    },
    inject: [EventRepository],
  },
];
