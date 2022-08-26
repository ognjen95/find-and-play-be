import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sport } from 'src/sports/entities/sport.entity';
import { Repository } from 'typeorm';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Sport) private sportRepository: Repository<Sport>,
  ) {}

  async create(createEventInput: CreateEventInput) {
    const sport = await this.sportRepository.findOne({
      where: { name: createEventInput.sportName },
    });

    const newEvent = this.eventRepository.create({
      ...createEventInput,
      sport: {
        name: sport.name,
        image: sport.image,
      },
    });

    const event = await this.eventRepository.save(newEvent);

    return event;
  }

  async findAll() {
    const events = await this.eventRepository.find();

    return events;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  async update(
    id: string,
    updateEventInput: UpdateEventInput,
  ): Promise<UpdateEventInput & { participantIds: string[] }> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) throw new NotFoundException('Event not found');

    const { participantId } = updateEventInput;
    const { currentNumOfParticipants, participantIds, maxNumOfParticipants } =
      event;

    const participantAlreadyExists =
      !!event?.participantIds?.includes(participantId);
    const newParticipants = participantAlreadyExists
      ? [...participantIds]
      : [...participantIds, participantId];

    if (
      !participantAlreadyExists &&
      currentNumOfParticipants === maxNumOfParticipants
    ) {
      throw new BadRequestException('Maximum number of players reached');
    }

    const updatedEvent = {
      ...event,
      ...updateEventInput,
      participantIds: participantIds?.length
        ? newParticipants
        : [participantId],
      currentNumOfParticipants: participantAlreadyExists
        ? currentNumOfParticipants
        : currentNumOfParticipants + 1,
    };

    delete updatedEvent.participantId;

    await this.eventRepository.update(id, updatedEvent);

    return updatedEvent;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
