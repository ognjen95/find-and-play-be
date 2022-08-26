import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSportInput } from './dto/create-sport.input';
import { UpdateSportInput } from './dto/update-sport.input';
import { Sport } from './entities/sport.entity';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport) private sportRepository: Repository<Sport>,
  ) {}

  async create(createSportInput: CreateSportInput): Promise<CreateSportInput> {
    const sport = await this.sportRepository.save(createSportInput);

    return sport;
  }

  async findAll(): Promise<CreateSportInput[]> {
    return await this.sportRepository.find();
  }

  async findOne(id: string) {
    const sport = await this.sportRepository.findOne({ where: { id } });

    if (!sport) throw new NotFoundException('Sport not found');

    return sport;
  }

  async update(id: string, updateSportInput: UpdateSportInput) {
    const user = await this.sportRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('Sport not found');

    await this.sportRepository.update(id, updateSportInput);

    return {
      ...user,
      ...updateSportInput,
    };
  }

  async remove(id: string) {
    await this.sportRepository.delete(id);

    return { id };
  }
}
