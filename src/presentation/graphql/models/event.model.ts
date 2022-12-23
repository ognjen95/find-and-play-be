import { Field, ObjectType } from '@nestjs/graphql';
import { LocationModel } from './location.model';
import { UserModel } from './user.model';

@ObjectType()
export class EventModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  description: string;

  @Field(() => [String])
  sports: string[];

  @Field()
  createdAt: Date;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field(() => LocationModel)
  location: LocationModel;

  @Field(() => [UserModel], { nullable: true })
  participants?: UserModel[];
}
