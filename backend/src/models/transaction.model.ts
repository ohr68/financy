import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { UserModel } from "./user.model"
import { CategoryModel } from "./category.model"

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  type!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Number)
  amount!: number

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date

  @Field(() => String)
  userId!: string

  @Field(() => String)
  categoryId!: string

  @Field(() => Number)
  totalBalance?: number

  @Field(() => Number)
  monthlyIncomes?: number

  @Field(() => Number)
  monthlyExpenses?: number

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel
}