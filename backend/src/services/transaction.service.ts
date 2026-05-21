import { prismaClient } from "../../prisma/prisma"
import type { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"

export class TransactionService {
  async listTransactions() {
    return await prismaClient.transaction.findMany()
  }

  async findByCategoryId(categoryId: string) {
    return await prismaClient.transaction.findMany({
      where: {
        categoryId
      }
    })
  }

  async createTransaction(
    userId: string,
    categoryId: string,
    data: CreateTransactionInput) {
    return await prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: categoryId,
        userId
      }
    })
  }

  async updateTransaction(
    id: string,
    categoryId: string,
    data: UpdateTransactionInput) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id
      }
    })

    if (!transaction) throw new Error('Transação não encontrada')

    return prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: categoryId,
      }
    })
  }

  async deleteTransaction(id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id
      }
    })

    if (!transaction) throw new Error('Transação não encontrada')

    return prismaClient.transaction.delete({
      where: { id }
    })
  }
}