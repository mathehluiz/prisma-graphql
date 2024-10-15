import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Post } from './post.type';

@ObjectType()
export class User {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

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
