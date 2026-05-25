import { CircleAlert } from 'lucide-react'
import type { Transaction } from '../types/transaction'
import { CategoryBadge } from './CategoryBadge'
import { CategoryIcon } from './CategoryIcon'
import type { CategoryColor } from '../types/category'

interface RecentTransactionsListProps {
  transactions: Transaction[]
  onNewTransaction: () => void
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

export function RecentTransactionsList({ transactions, onNewTransaction }: RecentTransactionsListProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Transações recentes
        </span>
        <a href="/transactions" className="text-xs font-medium text-brand hover:underline flex items-center gap-1">
          Ver todas →
        </a>
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              {tx.category && (
                <CategoryIcon
                  icon={tx.category.icon}
                  color={tx.category.color as CategoryColor}
                  size="sm"
                />
              )}
              <div>
                <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {tx.category && (
                <CategoryBadge
                  title={tx.category.title}
                  color={tx.category.color as CategoryColor}
                />
              )}
              <span className={`text-sm font-semibold ${tx.type === 'Revenue' ? 'text-success' : 'text-danger'}`}>
                {tx.type === 'Revenue' ? '+' : '-'} {formatCurrency(tx.amount)}
              </span>
              <CircleAlert size={16} className="text-gray-300" />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNewTransaction}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-3 text-sm text-gray-500 hover:bg-gray-50 transition cursor-pointer"
      >
        + Nova transação
      </button>
    </div>
  )
}
