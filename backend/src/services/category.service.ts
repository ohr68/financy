import { prismaClient } from "../../prisma/prisma"
import type { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input"

export class CategoryService {
  async listCategories() {
    return await prismaClient.category.findMany()
  }

  async createCategory(data: CreateCategoryInput, userId: string) {
    const existingCategory = await prismaClient.category.findUnique({
      where: {
        title: data.title
      }
    })

    if (existingCategory) throw new Error('Categoria já cadastrada')

    return await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId
      }
    })
  }

  async updateCategory(id:string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: {
        id
      }
    })

    if (!category) throw new Error('Categoria não encontrada')

    return prismaClient.category.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
      }
    })
  }

  async deleteCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id
      }
    })

    if (!category) throw new Error('Categoria não encontrada')

    return prismaClient.category.delete({
      where: { id }
    })
  }
}