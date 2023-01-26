import { EventRepository } from 'src/infrastructure/repository/event/event.repository';
import { UserRepository } from 'src/infrastructure/repository/user/user.repository';
import CreateEventHandler from './create-event/create-event.handler';
import CreateJoinRequestHandler from './create-join-request/CreateJoinRequestHandler';

export const EventCommandHandlers = [
  {
    provide: CreateEventHandler,
    useFactory: (
      eventRepository: EventRepository,
      userRepository: UserRepository,
    ) => {
      return new CreateEventHandler(eventRepository, userRepository);
    },
    inject: [EventRepository, UserRepository],
  },
  {
    provide: CreateJoinRequestHandler,
    useFactory: (eventRepository: EventRepository) => {
      return new CreateJoinRequestHandler(eventRepository);
    },
    inject: [EventRepository],
  },
];
