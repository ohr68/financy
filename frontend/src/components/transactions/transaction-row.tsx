import { Trash2, Pencil, CircleAlert } from 'lucide-react'
import type { Transaction } from '../types/transaction'
import { CategoryBadge } from './CategoryBadge'
import { CategoryIcon } from './CategoryIcon'
import type { CategoryColor } from '../types/category'

interface TransactionRowProps {
  transaction: Transaction
  onDelete: (id: string) => void
  onEdit: (transaction: Transaction) => void
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

export function TransactionRow({ transaction, onDelete, onEdit }: TransactionRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {transaction.category && (
            <CategoryIcon
              icon={transaction.category.icon}
              color={transaction.category.color as CategoryColor}
              size="sm"
            />
          )}
          <span className="text-sm font-medium text-gray-800">{transaction.description}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-500">{formatDate(transaction.date)}</td>
      <td className="py-4 px-4">
        {transaction.category && (
          <CategoryBadge
            title={transaction.category.title}
            color={transaction.category.color as CategoryColor}
          />
        )}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          <CircleAlert
            size={14}
            className={transaction.type === 'Revenue' ? 'text-success' : 'text-danger'}
          />
          <span className={`text-sm font-medium ${transaction.type === 'Revenue' ? 'text-success' : 'text-danger'}`}>
            {transaction.type === 'Revenue' ? 'Entrada' : 'Saída'}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 text-sm font-semibold text-right">
        <span className={transaction.type === 'Revenue' ? 'text-success' : 'text-danger'}>
          {transaction.type === 'Revenue' ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-gray-400 hover:text-danger transition cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => onEdit(transaction)}
            className="text-gray-400 hover:text-blue-500 transition cursor-pointer"
          >
            <Pencil size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
