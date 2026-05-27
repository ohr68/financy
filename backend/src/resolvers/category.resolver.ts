import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql"
import { TransactionModel } from "../models/transaction.model"
import { IsAuth } from "../middlewares/auth.middleware"
import { TransactionService } from "../services/transaction.service"
import { GqlUser } from "../graphql/decorators/user.decorator"
import type { User } from "../generated/prisma/browser"
import { UserModel } from "../models/user.model"
import { UserService } from "../services/user.service"
import { CategoryModel } from "../models/category.model"
import { CategoryService } from "../services/category.service"
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input"
import { MostUsedCategoryOutput } from "../dtos/output/category.output"

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService: CategoryService = new CategoryService()
  private userService: UserService = new UserService()
  private transactionService: TransactionService = new TransactionService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User

  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id)

    return true
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return this.categoryService.listCategories()
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.userId)
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    return this.transactionService.findByCategoryId(category.id)
  }

  @FieldResolver(() => Number)
  async countCategories(@Root() category: CategoryModel): Promise<number> {
    return this.categoryService.countCategories(category.userId)
  }

  @FieldResolver(() => MostUsedCategoryOutput, {
    nullable: true
  })
  async mostUsedCategory(@Root() category: CategoryModel): Promise<MostUsedCategoryOutput | null> {
    return this.transactionService.mostUsedCategory(category.userId)
  }

  @FieldResolver(() => Number)
  async countTransactions(@Root() category: CategoryModel): Promise<number> {
    return this.transactionService.countTransactions(category.userId)
  }
}