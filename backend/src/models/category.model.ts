import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql"
import { TransactionModel } from "./transaction.model"
import { UserModel } from "./user.model"

@ObjectType()
export class CategoryModel {
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

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[]
}