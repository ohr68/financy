import { prismaClient } from "../../prisma/prisma"
import type { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"
import type { TransactionType } from "../generated/prisma/enums"

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

  async countTransactions(userId: string) {
    return await prismaClient.transaction.count({
      where: {
        userId
      }
    })
  }

  async mostUsedCategory(userId: string) {
    const [top] = await prismaClient.transaction.groupBy({
      by: ['categoryId'],

      where: {
        userId
      },

      _count: {
        categoryId: true
      },

      orderBy: {
        _count: {
          categoryId: 'desc'
        }
      },

      take: 1
    })

    if (!top) {
      return null
    }

    return prismaClient.category.findUnique({
      where: {
        id: top.categoryId
      },

      select: {
        title: true,
        icon: true
      }
    })
  }

  async getMontlhyAmountByType(userId: string, type: TransactionType) {
    const now = new Date()

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    )

    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    )

    return await prismaClient.transaction.aggregate({
      where: {
        userId,
        type,
        gte: startOfMonth,
        lt: startOfNextMonth
      },
      _sum: {
        amount: true
      }
    })
  }
}