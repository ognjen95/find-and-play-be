import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/application/interfaces/event/event.repository.interface';
import { EventRequest } from 'src/domain/event/EventRequest';
import { v4 as uuid } from 'uuid';
import { CreateJoinRequestCommand } from './CreateJoinRequestCommand';

@CommandHandler(CreateJoinRequestCommand)
class CreteJoinRequestHandler
  implements ICommandHandler<CreateJoinRequestCommand>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute({
    eventId,
    userId,
  }: CreateJoinRequestCommand): Promise<EventRequest> {
    const eventReq = new EventRequest(uuid(), eventId, userId);

    const event = await this.eventRepository.findOneById(eventId);

    console.log(event);

    event.addNewEventRequest(eventReq);

    const adminsIds = event?._admins?.map((admin) => ({
      id: admin.getId(),
    }));

    return await this.eventRepository.joinRequest(eventReq, adminsIds);
  }
}

export default CreteJoinRequestHandler;
