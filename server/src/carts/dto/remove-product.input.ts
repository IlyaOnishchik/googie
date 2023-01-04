import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RemoveProductInput {
  @Field()
  cartId: string;

  @Field()
  productId: string;
}