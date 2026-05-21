import { Field, GraphQLISODateTime, InputType } from "type-graphql"
import { TransactionType } from "../../generated/prisma/enums"

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String)
  description!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Number)
  amount!: number
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => TransactionType)
  type?: TransactionType

  @Field(() => String)
  description?: string

  @Field(() => GraphQLISODateTime)
  date?: Date

  @Field(() => Number)
  amount?: number
}