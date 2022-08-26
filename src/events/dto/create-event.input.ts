import { InputType, Field } from '@nestjs/graphql';
import { Sport } from 'src/sports/entities/sport.entity';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateEventInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  sportName: string;

  @Field()
  maxNumOfParticipants: number;

  @Field()
  currentNumOfParticipants: number;
}
