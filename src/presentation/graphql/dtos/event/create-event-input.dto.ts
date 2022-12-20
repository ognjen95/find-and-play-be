import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { LocationInput } from '../location/location-input.dto';

@InputType()
export class CreateEventInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Field()
  startTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Field()
  endTime: Date;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @Field(() => [String])
  sports: string[];

  @IsObject()
  @IsNotEmpty()
  @Field(() => LocationInput)
  location: LocationInput;
}
