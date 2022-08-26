import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSportInput {
  @Field()
  name: string;

  @Field()
  image: string;
}
