import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';

@ObjectType()
export class EventRequestModel {
  @Field()
  id: string;

  @Field()
  eventId: string;

  @Field()
  userId: string;

  @Field(() => [UserModel], { nullable: true })
  requestFor?: UserModel[];

  @Field(() => UserModel, { nullable: true })
  requestFrom?: UserModel;

  @Field()
  isApproved: boolean;
}
