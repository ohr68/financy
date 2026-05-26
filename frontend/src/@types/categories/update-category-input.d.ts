import type { CategoryColor } from "./category-color"

export interface UpdateCategoryInput {
  title?: string
  description?: string
  icon: string
  color: CategoryColor
}
 