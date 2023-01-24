import { CreateEventDto } from 'src/application/dtos/event/create-event.dto';

export class CreateEventCommand {
  constructor(
    public readonly dto: CreateEventDto,
    public readonly creatorId: string,
  ) {}
}
