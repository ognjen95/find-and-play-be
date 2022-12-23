import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}
