import type { CategoryColor } from "./category-color"
import type { CategoryIconName } from "./category-icons"
import type { MostUsedCategory } from "./most-used-category"

export interface Category {
  id: string
  title: string
  description: string
  icon: CategoryIconName
  color: CategoryColor
  userId: string
  countTransactions?: number
  countCategories?: number
  mostUsedCategory?: MostUsedCategory
  createdAt: string
  updatedAt?: string
}
 