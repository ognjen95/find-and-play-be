import { CreateEventDto } from 'src/application/dto/event/create-event.dto';

export class CreateEventCommand {
  constructor(public readonly dto: CreateEventDto) {}
}
