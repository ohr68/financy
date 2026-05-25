import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import { TransactionsFilters } from '../components/transactions/transaction-filters'
import { TransactionsTable } from '../components/transactions/transactions-table'
import { CreateTransactionModal } from '../components/CreateTransactionModal'
import type { Transaction, TransactionType } from '../types/transaction'

export function TransactionsPage() {
  const { transactions, loading, deleteTransaction } = useTransactions()
  const { categories } = useCategories()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.description?.toLowerCase().includes(search.toLowerCase()) ?? true
      const matchesType = typeFilter === 'all' || tx.type === typeFilter
      const matchesCategory = !categoryFilter || tx.categoryId === categoryFilter
      const matchesMonth = !monthFilter || tx.date.startsWith(monthFilter)

      return matchesSearch && matchesType && matchesCategory && matchesMonth
    })
  }, [transactions, search, typeFilter, categoryFilter, monthFilter])

  async function handleDelete(id: string) {
    await deleteTransaction(id)
  }

  function handleEdit(transaction: Transaction) {
    // TODO: open edit modal with transaction data
    console.log('edit', transaction)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Carregando...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
          <p className="text-sm text-gray-500">Gerencie todas as suas transações financeiras</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition cursor-pointer"
        >
          <Plus size={16} />
          Nova transação
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <TransactionsFilters
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1) }}
          typeFilter={typeFilter}
          onTypeChange={(v) => { setTypeFilter(v); setPage(1) }}
          categoryFilter={categoryFilter}
          onCategoryChange={(v) => { setCategoryFilter(v); setPage(1) }}
          monthFilter={monthFilter}
          onMonthChange={(v) => { setMonthFilter(v); setPage(1) }}
          categories={categories}
        />
      </div>

      <TransactionsTable
        transactions={filtered}
        page={page}
        onPageChange={setPage}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <CreateTransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
