export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description: string;
  image?: string;
  sports: string[];
  location: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  };
  //   events: Event[];
  //   clubs: Club[];
}
