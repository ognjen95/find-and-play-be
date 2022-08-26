import { CreateSportInput } from './create-sport.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSportInput extends PartialType(CreateSportInput) {
  @Field()
  id: string;
}
