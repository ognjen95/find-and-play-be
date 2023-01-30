import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/application/interfaces/event/event.repository.interface';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import Event from 'src/domain/event/Event';
import { EventRequest } from 'src/domain/event/EventRequest';
import { v4 as uuid } from 'uuid';
import { ApproveEventRequestCommand } from './approve-event-request.command';

@CommandHandler(ApproveEventRequestCommand)
class ApproveEventRequestHandler
  implements ICommandHandler<ApproveEventRequestCommand>
{
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute({
    eventRequestId,
    userId,
  }: ApproveEventRequestCommand): Promise<EventRequest> {
    // const event = await this.eventRepository.findOneById(eventRequestId);

    // const isAdmin = event._admins.some((admin) => admin._id === userId);
    // console.log({ eve: event._admins[0]._id, userId });
    // if (!isAdmin) {
    //   throw new ForbiddenException('You are not admin of this event');
    // }

    return this.eventRepository.approveEventRequest(eventRequestId, userId);
  }
}

export default ApproveEventRequestHandler;
