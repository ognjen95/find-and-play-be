import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => Float)
  lng: number;
  @Field(() => Float)
  lat: number;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  state: string;
}
