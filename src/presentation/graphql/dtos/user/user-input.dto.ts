import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { LocationInput } from '../location/location-input.dto';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  image: string;

  @IsOptional()
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
