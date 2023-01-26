import { Field, Int, ObjectType } from '@nestjs/graphql';
import { LocationModel } from './location.model';

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
  password: string;

  @Field()
  description: string;

  @Field(() => [String])
  sports: string[];

  @Field()
  createdAt: Date;

  @Field(() => Int, { nullable: true })
  reliability: number;

  @Field(() => Int, { nullable: true })
  stamina: number;

  @Field(() => LocationModel, { nullable: true })
  location?: LocationModel;
}
