import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationModel {
  @Field(() => Float)
  lng: number;
  @Field(() => Float)
  lat: number;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  state?: string;
}

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  description: string;

  @Field(() => [String])
  sports: string[];

  @Field()
  createdAt: Date;

  @Field(() => Int)
  reliability: number;

  @Field(() => Int)
  stamina: number;

  @Field(() => LocationModel)
  location: LocationModel;

  //   @Field(() => [Events])
  //   events: Event[];

  //   @Field(() => [Clubs])
  //   clubs: Clubs[];
}
