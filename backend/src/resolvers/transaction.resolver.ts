import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql"
import { TransactionModel } from "../models/transaction.model"
import { IsAuth } from "../middlewares/auth.middleware"
import { TransactionService } from "../services/transaction.service"
import { GqlUser } from "../graphql/decorators/user.decorator"
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"
import type { User } from "../generated/prisma/browser"
import { UserModel } from "../models/user.model"
import { UserService } from "../services/user.service"
import { CategoryModel } from "../models/category.model"
import { CategoryService } from "../services/category.service"

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService: TransactionService = new TransactionService()
  private userService: UserService = new UserService()
  private categoryService: CategoryService = new CategoryService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('categoryId', () => String) categoryId: string,
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User

  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(user.id, categoryId, data)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('categoryId', () => String) categoryId: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, categoryId, data)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id)

    return true
  }

  @Query(() => [TransactionModel])
  async listTransactions(): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions()
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.userId)
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
    return this.categoryService.findCategory(transaction.categoryId)
  }
}