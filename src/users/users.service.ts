import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserInput> {
    const user = await this.userRepository.save(createUserInput);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UpdateUserInput> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserInput> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.update(id, updateUserInput);

    return {
      ...user,
      ...updateUserInput,
    };
  }

  async remove(id: string): Promise<UpdateUserInput> {
    await this.userRepository.delete(id);

    return { id };
  }
}
