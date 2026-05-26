import type { CategoryColor } from "./category-color"

export interface CreateCategoryInput {
  title: string
  description: string
  icon: string
  color: CategoryColor
}