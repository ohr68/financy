import { prismaClient } from "../../prisma/prisma"
import type { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input"
import type { TransactionType } from "../generated/prisma/enums"

export class TransactionService {
  async listTransactions(userId: string) {
    return await prismaClient.transaction.findMany()
  }

  async findByCategoryId(categoryId: string, userId: string) {
    return await prismaClient.transaction.findMany({
      where: {
        categoryId,
        userId
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
    const top = await prismaClient.transaction.groupBy({
      by: ['categoryId'],

      where: {
        userId,
      },

      _count: {
        categoryId: true,
      },

      orderBy: {
        _count: {
          categoryId: 'desc',
        },
      },

      take: 1,
    })

    const best = top[0]
    if (!best) return null

    return prismaClient.category.findUnique({
      where: {
        id: best.categoryId,
      },
      select: {
        title: true,
        icon: true,
        color: true
      },
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

    const result = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type,

        date: {
          gte: startOfMonth,
          lt: startOfNextMonth
        }
      },

      _sum: {
        amount: true
      }
    })

    return result._sum.amount ?? 0
  }

  async getTotalBalance(userId: string) {
    const [revenues, expenses] = await Promise.all([
      prismaClient.transaction.aggregate({
        where: {
          userId,
          type: 'Revenue'
        },

        _sum: {
          amount: true
        }
      }),

      prismaClient.transaction.aggregate({
        where: {
          userId,
          type: 'Expense'
        },

        _sum: {
          amount: true
        }
      })
    ])

    const totalRevenue = revenues._sum.amount ?? 0
    const totalExpense = expenses._sum.amount ?? 0

    return totalRevenue - totalExpense
  }

  async getCategorySummaries(userId: string) {
    const result = await prismaClient.transaction.groupBy({
      by: ['categoryId'],
      where: { userId },

      _count: {
        id: true,
      },

      _sum: {
        amount: true,
      },
    })

    const [income, expenses, categories] = await Promise.all([
      prismaClient.transaction.groupBy({
        by: ['categoryId'],
        where: {
          userId,
          type: 'Revenue',
        },
        _sum: {
          amount: true,
        },
      }),

      prismaClient.transaction.groupBy({
        by: ['categoryId'],
        where: {
          userId,
          type: 'Expense',
        },
        _sum: {
          amount: true,
        },
      }),

      prismaClient.category.findMany({
        where: {
          id: {
            in: result.map(r => r.categoryId),
          },
        },

        select: {
          id: true,
          title: true,
          color: true,
          icon: true,
        },
      }),
    ])

    return result.map(r => {
      const incomeRow = income.find(i => i.categoryId === r.categoryId)
      const expenseRow = expenses.find(e => e.categoryId === r.categoryId)

      const category = categories.find(c => c.id === r.categoryId)

      const totalIncome = incomeRow?._sum.amount ?? 0
      const totalExpenses = expenseRow?._sum.amount ?? 0

      return {
        categoryId: r.categoryId,

        title: category?.title ?? '',
        color: category?.color ?? 'Blue',
        icon: category?.icon ?? 'Circle',

        totalTransactions: r._count.id,

        totalIncome,
        totalExpenses,

        net: totalIncome - totalExpenses,
      }
    })
  }
}