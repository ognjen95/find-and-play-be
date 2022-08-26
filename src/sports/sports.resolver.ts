import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SportsService } from './sports.service';
import { Sport } from './entities/sport.entity';
import { CreateSportInput } from './dto/create-sport.input';
import { UpdateSportInput } from './dto/update-sport.input';

@Resolver(() => Sport)
export class SportsResolver {
  constructor(private readonly sportsService: SportsService) {}

  @Mutation(() => Sport)
  createSport(@Args('createSportInput') createSportInput: CreateSportInput) {
    return this.sportsService.create(createSportInput);
  }

  @Query(() => [Sport], { name: 'sports' })
  findAll() {
    return this.sportsService.findAll();
  }

  @Query(() => Sport, { name: 'sport' })
  findOne(@Args('id') id: string) {
    return this.sportsService.findOne(id);
  }

  @Mutation(() => Sport)
  updateSport(@Args('updateSportInput') updateSportInput: UpdateSportInput) {
    return this.sportsService.update(updateSportInput.id, updateSportInput);
  }

  @Mutation(() => Sport)
  removeSport(@Args('id') id: string) {
    return this.sportsService.remove(id);
  }
}
