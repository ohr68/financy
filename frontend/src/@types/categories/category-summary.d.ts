import type { CategoryColor } from "./category-color"

export interface CategorySummary {
  categoryId: string
  title: string
  color: CategoryColor
  totalTransactions: number
  totalIncome: number
  totalExpenses: number
  net: number
}