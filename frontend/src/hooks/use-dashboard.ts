import { useMemo } from 'react'
import { useTransactions } from './use-transactions'
import type { CategorySummary } from '../@types/categories/category-summary'
import type { TypedDocumentNode } from '@apollo/client'
import { CATEGORY_SUMMARIES } from '../graphql/queries/transaction-queries'
import { useQuery } from '@apollo/client/react'

type CategorySummariesResponse = {
  categorySummaries: CategorySummary[]
}

const typedCategorySummaries =
  CATEGORY_SUMMARIES as TypedDocumentNode<CategorySummariesResponse>

export function useDashboard() {
  const { transactions, transactionsListLoading, transactionsListError } = useTransactions()

  const summary = useMemo(() => {
    if (!transactions.length) {
      return {
        totalBalance: 0,
        monthlyIncomes: 0,
        monthlyExpenses: 0,
        countTransactions: 0,
        countCategories: 0,
        mostUsedCategory: null,
      }
    }

    const latest = transactions[0]

    return {
      totalBalance: latest.totalBalance,
      monthlyIncomes: latest.monthlyIncomes,
      monthlyExpenses: latest.monthlyExpenses,
      countTransactions: latest.countTransactions,
      countCategories: latest.countCategories,
      mostUsedCategory: latest.mostUsedCategory ?? null,
    }
  }, [transactions])

  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 5),
    [transactions]
  )

    const {
      data: categorySummaries,
      loading: categorySummariesLoading,
      error: categorySummariesError,
      refetch: categorySummariesRefetch
    } = useQuery(typedCategorySummaries)

  return {
    summary,
    recentTransactions,
    transactionsListLoading,
    transactionsListError,
    categorySummaries: categorySummaries?.categorySummaries ?? [],
    categorySummariesLoading,
    categorySummariesError,
    categorySummariesRefetch
  }
}