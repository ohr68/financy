import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class MostUsedCategoryOutput {
  @Field()
  title!: string

  @Field()
  icon!: string
}