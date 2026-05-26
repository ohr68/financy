import type { TransactionType } from './transaction-type'

export interface CreateTransactionInput {
  description: string
  amount: number
  date: string
  type: TransactionType
}