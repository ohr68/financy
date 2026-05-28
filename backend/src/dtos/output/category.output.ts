import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class MostUsedCategoryOutput {
  @Field(() => String)
  title!: string

  @Field(() => String)
  icon!: string

  @Field(() => String)
  color!: string
}

@ObjectType()
export class CategorySummaryOutput {
  @Field(() => String)
  categoryId!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  color!: string

  @Field(() => Number)
  totalTransactions!: number

  @Field(() => Number)
  totalIncome!: number

  @Field(() => Number)
  totalExpenses!: number

  @Field(() => Number)
  net!: number
}