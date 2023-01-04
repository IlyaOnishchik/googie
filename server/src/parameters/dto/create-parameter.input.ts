import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateParameterInput {
  @Field()
  name: string;

  @Field()
  type: string;
}