import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from './pagination.input';

@InputType()
export class QueryOptionsInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  search?: string;

  @IsObject()
  @IsOptional()
  @Field(() => PaginationInput, { nullable: true })
  paginationOptions?: PaginationInput;
}
