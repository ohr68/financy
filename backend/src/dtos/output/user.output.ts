import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UpdateUserOutput {
  @Field(() => String)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string
}