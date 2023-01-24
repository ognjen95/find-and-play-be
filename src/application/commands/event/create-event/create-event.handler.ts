import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IEventRepository } from 'src/application/interfaces/event/user.repository.interface';
import { IUserRepository } from 'src/application/interfaces/user/user.repository.interface';
import Event from 'src/domain/event/Event';
import { v4 as uuid } from 'uuid';
import { CreateEventCommand } from './create-event.command';

@CommandHandler(CreateEventCommand)
class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ dto, creatorId }: CreateEventCommand): Promise<Event> {
    const { name, description, sports, startTime, endTime, location } = dto;
    const event = new Event(
      uuid(),
      name,
      startTime,
      endTime,
      description,
      sports,
      location,
    );

    const user = await this.userRepository.findOneById(creatorId);
    event.addParticipant(user);

    return this.eventRepository.createOne(event, creatorId);
  }
}

export default CreateEventHandler;
