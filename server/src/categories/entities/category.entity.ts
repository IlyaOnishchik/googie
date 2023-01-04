import { Field, ObjectType } from "@nestjs/graphql";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column()
  @Field()
  imageName: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  @Field(() => [Subcategory], { nullable: true })
  subcategories: Subcategory[];
}