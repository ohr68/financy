import { useMemo } from 'react'
import { useTransactions } from './useTransactions'

export function useDashboard() {
  const { transactions, loading, error } = useTransactions()

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
    () => transactions.slice(0, 5),
    [transactions]
  )

  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, { title: string; icon: string; color: string; total: number; count: number }>()

    for (const tx of transactions) {
      if (!tx.category) continue

      const key = tx.category.id
      const existing = map.get(key)

      if (existing) {
        existing.total += tx.type === 'Expense' ? tx.amount : 0
        existing.count += 1
      } else {
        map.set(key, {
          title: tx.category.title,
          icon: tx.category.icon,
          color: tx.category.color,
          total: tx.type === 'Expense' ? tx.amount : 0,
          count: 1,
        })
      }
    }

    return Array.from(map.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [transactions])

  return {
    summary,
    recentTransactions,
    categoryBreakdown,
    loading,
    error,
  }
}