import type { TransactionType } from './transaction-type'

export interface UpdateTransactionInput {
  description: string
  amount: number
  date: string
  type: TransactionType
}
 