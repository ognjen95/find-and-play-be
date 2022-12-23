import { LocationDto } from '../location/location.dto';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description: string;
  image?: string;
  sports: string[];
  location: LocationDto;
}
