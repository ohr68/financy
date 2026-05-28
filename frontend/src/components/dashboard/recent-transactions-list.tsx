import { ArrowDownCircle, ArrowLeft, ArrowRight, ArrowUpCircle, ChevronRight, CircleAlert, Plus } from 'lucide-react'
import { CategoryBadge } from '../categories/category-badge'
import { CategoryIcon } from '../categories/category-icon'
import type { Transaction } from '../../@types/transactions/transaction'
import type { CategoryColor } from '../../@types/categories/category-color'

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

export function RecentTransactionsList({
  transactions,
  onNewTransaction
}: RecentTransactionsListProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Transações recentes
        </span>

        <div className="flex items-center gap-1 hover:underline hover:cursor-pointer">
          <a href="/transactions" className="text-xs font-medium text-brand">
            Ver todas
          </a>
          <ChevronRight size={18} className="stroke-brand" />
        </div>
      </div>

      <div className="flex flex-col">
        {transactions.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between px-6 py-3 border-b border-gray-200'
          >
            <div className="flex items-center gap-3">
              {item.category && (
                <CategoryIcon
                  icon={item.category.icon}
                  color={item.category.color as CategoryColor}
                  size="md"
                />
              )}

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>

            <div className="flex w-1/3 items-center justify-between">
              {item.category && (
                <CategoryBadge
                  title={item.category.title}
                  color={item.category.color as CategoryColor}
                />
              )}

              <div className='flex items-center gap-2'>
                <span
                  className='text-sm font-semibold text-gray-800'>
                  {item.type === 'Revenue' ? '+' : '-'} {formatCurrency(item.amount)}
                </span>

                {
                  item.type === 'Revenue' ? (
                    <ArrowUpCircle size={16} className="text-brand" />
                  ) :
                    (
                      <ArrowDownCircle size={16} className="text-red" />
                    )
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onNewTransaction}
        className="
            flex w-full items-center justify-center gap-2
            px-6 py-4 text-sm text-brand
            hover:bg-gray-50 transition
            hover:cursor-pointer
          "
      >
        <Plus size={18} className="stroke-brand" />
        Nova transação
      </button>
    </div>
  )
}