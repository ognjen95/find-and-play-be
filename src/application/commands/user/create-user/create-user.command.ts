import { CreateUserDto } from 'src/application/dto/user/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly dto: CreateUserDto) {}
}
