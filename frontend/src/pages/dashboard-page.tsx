import { useState } from 'react'
import { useDashboard } from '../hooks/useDashboard'
import { SummaryCards } from '../components/dashboard/summary-cards'
import { RecentTransactionsList } from '../components/dashboard/recent-transactions-list'
import { CategoriesSidebar } from '../components/CategoriesSidebar'
import { CreateTransactionModal } from '../components/CreateTransactionModal'

export function DashboardPage() {
  const { summary, recentTransactions, categoryBreakdown, loading } = useDashboard()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Carregando...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <SummaryCards
        totalBalance={summary.totalBalance}
        monthlyIncomes={summary.monthlyIncomes}
        monthlyExpenses={summary.monthlyExpenses}
      />

      <div className="grid grid-cols-[1fr_280px] gap-6">
        <RecentTransactionsList
          transactions={recentTransactions}
          onNewTransaction={() => setIsModalOpen(true)}
        />
        <CategoriesSidebar categories={categoryBreakdown} />
      </div>

      <CreateTransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
