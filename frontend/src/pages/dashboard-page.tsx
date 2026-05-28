import { useState } from 'react'
import { useDashboard } from '../hooks/use-dashboard'
import { SummaryCards } from '../components/dashboard/summary-cards'
import { RecentTransactionsList } from '../components/dashboard/recent-transactions-list'
import { CategoriesSidebar } from '../components/dashboard/categories-sidebar'
import { TransactionModal } from '../components/transactions/transaction-modal'

export function DashboardPage() {
  const {
    summary,
    recentTransactions,
    transactionsListLoading,
    categorySummaries,
    categorySummariesLoading
  } = useDashboard()
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (transactionsListLoading || categorySummariesLoading) {
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

      <div className="grid grid-cols-3 gap-6">
        <div className='col-span-2'>
          <RecentTransactionsList
            transactions={recentTransactions}
            onNewTransaction={() => setIsModalOpen(true)}
          />
        </div>
        <div>
          <CategoriesSidebar categories={categorySummaries} />
        </div>
      </div>

      <TransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
