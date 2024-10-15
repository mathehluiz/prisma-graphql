import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  published: boolean;

  @IsNotEmpty()
  @IsString()
  @Field()
  authorId: string;
}
