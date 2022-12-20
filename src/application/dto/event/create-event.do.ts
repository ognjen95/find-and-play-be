import { LocationDto } from '../location/location.dto';

export class CreateEventDto {
  name: string;
  description: string;
  sports: string[];
  startTime: Date;
  endTime: Date;
  location: LocationDto;
}
