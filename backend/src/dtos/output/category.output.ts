import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class MostUsedCategoryOutput {
  @Field(() => String)
  title!: string

  @Field(() => String)
  icon!: string
}