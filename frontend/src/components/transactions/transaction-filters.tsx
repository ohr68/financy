import { Search } from 'lucide-react'
import type { Category } from '../types/category'
import type { TransactionType } from '../types/transaction'

interface TransactionsFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  typeFilter: TransactionType | 'all'
  onTypeChange: (v: TransactionType | 'all') => void
  categoryFilter: string
  onCategoryChange: (v: string) => void
  monthFilter: string
  onMonthChange: (v: string) => void
  categories: Category[]
}

export function TransactionsFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  categoryFilter,
  onCategoryChange,
  monthFilter,
  onMonthChange,
  categories,
}: TransactionsFiltersProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Buscar</label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por descrição"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:border-2 transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Tipo</label>
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value as TransactionType | 'all')}
          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:border-2 transition bg-white"
        >
          <option value="all">Todos</option>
          <option value="Expense">Saída</option>
          <option value="Revenue">Entrada</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Categoria</label>
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:border-2 transition bg-white"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Período</label>
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => onMonthChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500 focus:border-2 transition"
        />
      </div>
    </div>
  )
}
