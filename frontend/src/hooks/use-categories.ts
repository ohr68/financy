import { LIST_CATEGORIES } from '../graphql/queries/category-queries'
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from '../graphql/mutations/category-mutations'
import type { Category } from '../@types/categories/category'
import type { CreateCategoryInput } from '../@types/categories/create-category-input'
import type { UpdateCategoryInput } from '../@types/categories/update-category-input'
import { useMutation, useQuery } from '@apollo/client/react'
import type { TypedDocumentNode } from '@apollo/client'
import type { MostUsedCategory } from '../@types/categories/most-used-category'
import { CATEGORY_SUMMARIES, LIST_TRANSACTIONS, MOST_USED_CATEGORY } from '../graphql/queries/transaction-queries'

type ListCategoriesResponse = {
  listCategories: Category[]
}

const typedListCategories =
  LIST_CATEGORIES as TypedDocumentNode<ListCategoriesResponse>

type MostUsedCategoryResponse = {
  mostUsedCategory: MostUsedCategory
}

const typedMostUsedCategory =
  MOST_USED_CATEGORY as TypedDocumentNode<MostUsedCategoryResponse>

export function useCategories() {
  const {
    data: categoryList,
    loading: categoryListLoading,
    error: categoryListError,
    refetch: categoryListRefetch } = useQuery(typedListCategories)

  const {
    data: categorySummaries,
    loading: categorySummariesLoading,
    error: categorySummariesError,
    refetch: categorySummariesRefetch
  } = useQuery(CATEGORY_SUMMARIES)

  const {
    data: mostUsedCategory,
    loading: mostUsedCategoryLoading,
    error: mostUsedCategoryError,
    refetch: mostUsedCategoryRefetch
  } = useQuery(typedMostUsedCategory)

  const [createCategoryMutation] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [
      { query: LIST_CATEGORIES },
      { query: CATEGORY_SUMMARIES },
      { query: MOST_USED_CATEGORY }
    ],
  })

  const [updateCategoryMutation] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [
      { query: LIST_CATEGORIES },
      { query: CATEGORY_SUMMARIES },
      { query: LIST_TRANSACTIONS },
      { query: MOST_USED_CATEGORY }
    ],
  })

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      { query: LIST_CATEGORIES },
      { query: CATEGORY_SUMMARIES },
      { query: LIST_TRANSACTIONS },
      { query: MOST_USED_CATEGORY }
    ],
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
    categories: categoryList?.listCategories ?? [],
    categoryListLoading,
    categoryListError,
    categoryListRefetch,
    mostUsedCategory: mostUsedCategory?.mostUsedCategory ?? null,
    mostUsedCategoryLoading,
    mostUsedCategoryError,
    mostUsedCategoryRefetch,
    categorySummaries,
    categorySummariesError,
    categorySummariesLoading,
    categorySummariesRefetch,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}