import type { TransactionType } from './transaction-type'
import type { MostUsedCategory } from '../categories/most-used-category'
import type { Category } from '../categories/category'

export interface Transaction {
  id: string
  description?: string
  amount: number
  date: string
  type: TransactionType
  categoryId: string
  userId: string
  category?: Category
  totalBalance: number
  monthlyExpenses: number
  monthlyIncomes: number
  countTransactions: number
  countCategories: number
  mostUsedCategory?: MostUsedCategory
  createdAt: string
  updatedAt?: string
}
 