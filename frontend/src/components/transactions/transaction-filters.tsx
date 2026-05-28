import { Search } from 'lucide-react'
import type { TransactionType } from '../../@types/transactions/transaction-type'
import type { Category } from '../../@types/categories/category'
import { Select } from '../select'
import { TextField } from '../text-field'
import { MonthPicker } from '../month-picker'

interface TransactionsFiltersProps {
  search: string
  typeFilter: TransactionType | 'all'
  categoryFilter: string
  monthFilter: string
  categories: Category[]

  onSearchChange: (v: string) => void
  onTypeChange: (v: TransactionType | 'all') => void
  onCategoryChange: (v: string) => void
  onMonthChange: (v: string) => void
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

  const transactionTypeOptions = [
    {
      value: 'all',
      label: 'Todos',
    },
    {
      value: 'Expense',
      label: 'Saída',
    },
    {
      value: 'Revenue',
      label: 'Entrada',
    },
  ]

  const categoryOptions = [
    {
      value: '',
      label: 'Todas',
    },

    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.title,
    })),
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col gap-1">
        <TextField
          label='Buscar'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por descrição"
          icon={<Search size={14} />}
        />
      </div>

      <Select
        label="Tipo"
        value={typeFilter}
        onChange={(v) => onTypeChange(v as TransactionType | 'all')}
        options={transactionTypeOptions}
      />

      <Select
        label="Categoria"
        value={categoryFilter}
        onChange={onCategoryChange}
        options={categoryOptions}
      />

      <div className="flex flex-col gap-1">
        <MonthPicker
          label="Período"
          value={monthFilter}
          onChange={onMonthChange}
          placeholder="Selecione um período"
        />
      </div>
    </div>
  )
}