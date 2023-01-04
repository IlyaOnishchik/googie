import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddProductInput {
  @Field()
  cartId: string;

  @Field()
  productId: string;
}