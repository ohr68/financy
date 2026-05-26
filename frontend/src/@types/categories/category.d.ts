import type { CategoryColor } from "./category-color"
import type { MostUsedCategory } from "./most-used-category"

export interface Category {
  id: string
  title: string
  description: string
  icon: string
  color: CategoryColor
  userId: string
  countTransactions?: number
  countCategories?: number
  mostUsedCategory?: MostUsedCategory
  createdAt: string
  updatedAt?: string
}
 