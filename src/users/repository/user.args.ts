import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => Float)
  lng: number;
  @Field(() => Float)
  lat: number;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  state?: string;
}

@InputType()
export class CreateUserInput {
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

  @Field(() => LocationInput)
  location: LocationInput;
}
