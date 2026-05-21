import { Field, InputType } from "type-graphql";
import { CategoryColor } from "../../generated/prisma/client";

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title!: string

  @Field(() => String)
  description!: string

  @Field(() => String)
  icon!: string

  @Field(() => CategoryColor)
  color!: CategoryColor
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string
  
  @Field(() => String)
  icon?: string

  @Field(() => CategoryColor)
  color?: CategoryColor
}