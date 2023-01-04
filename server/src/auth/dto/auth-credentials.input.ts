import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class AuthCredentialsInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(5)
  @Field()
  password: string;
}