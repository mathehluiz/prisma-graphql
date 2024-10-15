import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;
}
