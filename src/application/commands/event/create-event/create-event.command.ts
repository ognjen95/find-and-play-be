import { CreateEventDto } from 'src/application/dto/event/create-event.do';

export class CreateEventCommand {
  constructor(public readonly dto: CreateEventDto) {}
}
