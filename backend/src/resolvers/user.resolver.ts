import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { UpdateUserInput } from "../dtos/input/user.input";
import type { User } from "../generated/prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { UpdateUserOutput } from "../dtos/output/user.output";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private userService: UserService = new UserService()

  @Query(() => UserModel)
  async getUser(@Arg('id', () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id)
  }

  @Mutation(() => UpdateUserOutput)
  async updateUser(@Arg('data', () => UpdateUserInput) data: UpdateUserInput,
                   @GqlUser() user: User): Promise<UpdateUserOutput> {
    return this.userService.updateUser(user.id, data)
  }
}