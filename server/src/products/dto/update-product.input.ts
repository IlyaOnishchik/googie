import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateProductInput {
  @Field()
  id: string

  @Field({ nullable: true })
  name: string

  @Field(() => Int, { nullable: true })
  price: number

  @Field({ nullable: true })
  imageName: string
}