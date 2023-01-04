import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateProductParameterInput {
  @Field()
  productId: string;

  @Field()
  parameterId: string;

  @Field()
  value: string;
}