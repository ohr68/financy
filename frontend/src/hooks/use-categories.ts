import { useQuery, useMutation } from '@apollo/client'
import { LIST_CATEGORIES } from '../graphql/queries'
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from '../graphql/mutations'
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../types/category'

export function useCategories() {
  const { data, loading, error, refetch } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES
  )

  const [createCategoryMutation] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
  })

  const [updateCategoryMutation] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
  })

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
  })

  async function createCategory(data: CreateCategoryInput) {
    await createCategoryMutation({ variables: { data } })
  }

  async function updateCategory(id: string, data: UpdateCategoryInput) {
    await updateCategoryMutation({ variables: { id, data } })
  }

  async function deleteCategory(id: string) {
    await deleteCategoryMutation({ variables: { id } })
  }

  return {
    categories: data?.listCategories ?? [],
    loading,
    error,
    refetch,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}