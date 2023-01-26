import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EventRequestModel {
  @Field()
  id: string;

  @Field()
  eventId: string;

  @Field()
  userId: string;

  @Field()
  isApproved: boolean;
}
