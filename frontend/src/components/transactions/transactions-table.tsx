import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Transaction } from '../types/transaction'
import { TransactionRow } from './TransactionRow'

const PAGE_SIZE = 10

interface TransactionsTableProps {
  transactions: Transaction[]
  page: number
  onPageChange: (page: number) => void
  onDelete: (id: string) => void
  onEdit: (transaction: Transaction) => void
}

export function TransactionsTable({
  transactions,
  page,
  onPageChange,
  onDelete,
  onEdit,
}: TransactionsTableProps) {
  const totalPages = Math.ceil(transactions.length / PAGE_SIZE)
  const paginated = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Descrição</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Data</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Categoria</th>
            <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Tipo</th>
            <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Valor</th>
            <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((tx) => (
            <TransactionRow
              key={tx.id}
              transaction={tx}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {(page - 1) * PAGE_SIZE + 1} a {Math.min(page * PAGE_SIZE, transactions.length)} de {transactions.length} resultados
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded text-xs font-medium cursor-pointer transition ${
                p === page
                  ? 'bg-brand text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
