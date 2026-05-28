import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TransactionRow } from './transaction-row'
import type { Transaction } from '../../@types/transactions/transaction'

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
          <tr className="border-b border-gray-200">
            <th className="py-4 px-7 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Descrição</th>
            <th className="py-4 px-7 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Data</th>
            <th className="py-4 px-7 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Categoria</th>
            <th className="py-4 px-7 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tipo</th>
            <th className="py-4 px-7 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Valor</th>
            <th className="py-4 px-7 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Ações</th>
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

      <div className="flex items-center justify-between px-7 py-5">
        <span className="text-xs text-gray-700">
          {(page - 1) * PAGE_SIZE + 1} a {Math.min(page * PAGE_SIZE, transactions.length)} | {transactions.length} resultados
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1 rounded-sm
            w-7 h-7
            text-gray-700
            border-gray-300
            border
            cursor-pointer
            disabled:text-gray-500
            disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded-sm text-xs font-medium cursor-pointer transition ${
                p === page
                  ? 'bg-brand text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="p-1 rounded-sm
            w-7 h-7
            text-gray-700
            border-gray-300
            border
            cursor-pointer
            disabled:text-gray-500
            disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
