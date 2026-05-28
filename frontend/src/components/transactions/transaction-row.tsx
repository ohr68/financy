import { CircleAlert, Trash, SquarePen, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import { CategoryBadge } from '../categories/category-badge'
import { CategoryIcon } from '../categories/category-icon'
import type { Transaction } from '../../@types/transactions/transaction'
import type { CategoryColor } from '../../@types/categories/category-color'

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
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
      <td className="py-4 px-7">
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
      <td className="py-4 px-6 text-sm text-gray-500">{formatDate(transaction.date)}</td>
      <td className="py-4 px-6">
        {transaction.category && (
          <CategoryBadge
            title={transaction.category.title}
            color={transaction.category.color as CategoryColor}
          />
        )}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          {
            transaction.type === 'Revenue' ? 
            (
               <ArrowUpCircle
                size={14}
                className='text-green-dark'
              />
            ) : (
              <ArrowDownCircle
                size={14}
                className='text-red-dark'
              />
            )
          }
          <span className={`text-sm font-medium ${transaction.type === 'Revenue' ? 'text-green-dark' : 'text-red-dark'}`}>
            {transaction.type === 'Revenue' ? 'Entrada' : 'Saída'}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 text-sm font-semibold text-right">
        <span>
          {transaction.type === 'Revenue' ? '+' : '-'} {formatCurrency(transaction.amount)}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-red border border-gray-300 rounded-md p-1
              hover:border-gray-200
              hover:bg-gray-300
              transition cursor-pointer"
          >
            <Trash size={16} />
          </button>
          <button
            onClick={() => onEdit(transaction)}
            className="text-gray-700 border border-gray-300 rounded-md p-1
              hover:border-gray-200
              hover:bg-gray-300
              transition cursor-pointer"
          >
            <SquarePen size={16} />
          </button>
        </div>
      </td>
    </tr>
  )
}
