import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CursorInput {
  @Field()
  id: string;
}

@InputType()
export class PaginationInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
  take?: number;

  @IsOptional()
  @Field(() => Int, { nullable: true })
  skip?: number;

  @IsOptional()
  @Field(() => CursorInput, { nullable: true })
  cursor?: {
    id: string;
  };

  @IsOptional()
  @Field({ nullable: true })
  orderBy?: 'asc' | 'desc';
}
