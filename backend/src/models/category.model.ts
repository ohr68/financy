import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { TransactionModel } from "./transaction.model"
import { UserModel } from "./user.model"
import { CategoryColor } from "../generated/prisma/enums"
import { MostUsedCategoryOutput } from "../dtos/output/category.output"

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  description!: string

  @Field(() => String)
  icon!: string

  @Field(() => CategoryColor)
  color!: CategoryColor

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date

  @Field(() => String)
  userId!: string

  @Field(() => Number, { nullable: true })
  countCategories?: number

  @Field(() => MostUsedCategoryOutput, { nullable: true })
  mostUsedCategory?: MostUsedCategoryOutput

  @Field(() => Number, { nullable: true })
  countTransactions?: number

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[]
}