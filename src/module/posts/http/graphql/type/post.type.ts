import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@ObjectType()
export class Post {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  content: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  authorId: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  published: boolean;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  createdAt: Date;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  deletedAt: Date | null;
}
