import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationModel {
  @Field(() => Float)
  lng: number;
  @Field(() => Float)
  lat: number;
  @Field({ nullable: true })
  city: string;
  @Field({ nullable: true })
  state: string;
}
