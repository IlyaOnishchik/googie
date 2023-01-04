import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class ParameterToCreate {
  @Field()
  name: string;

  @Field()
  value: string;
}

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => Int)
  price: number;

  @Field()
  imageName: string;

  @Field()
  subcategoryId: string;

  @Field(() => [ParameterToCreate], { nullable: true })
  parameters: ParameterToCreate[]
}