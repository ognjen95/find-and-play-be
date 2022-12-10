export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  image?: string;
  sports: string[];
  location: {
    lat: number;
    lng: number;
  };
  //   events: Event[];
  //   clubs: Club[];
}
