import { useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react'
import { useTransactions } from '../../hooks/use-transactions'
import { useCategories } from '../../hooks/use-categories'
import { TextField } from '../text-field'
import type { TransactionType } from '../../@types/transactions/transaction-type'
import { CATEGORY_ICON_MAP } from '../../@types/categories/category-icons'
import { Select } from '../select'

interface CreateTransactionModalProps {
  open: boolean
  onClose: () => void
}

export function CreateTransactionModal({ open, onClose }: CreateTransactionModalProps) {
  const { createTransaction } = useTransactions()
  const { categories } = useCategories()

  const [type, setType] = useState<TransactionType>('Expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(false)

  const options = categories.map(cat => ({
    value: cat.id,
    label: cat.title,
    icon: CATEGORY_ICON_MAP[cat.icon as keyof typeof CATEGORY_ICON_MAP]
  }))

  async function handleSubmit() {
    if (!description || !amount || !date || !categoryId) return

    setLoading(true)
    try {
      await createTransaction(categoryId, {
        description,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
        type,
      })
      onClose()
      resetForm()
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setType('Expense')
    setDescription('')
    setAmount('')
    setDate('')
    setCategoryId('')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-base font-semibold text-gray-800">Nova transação</h2>
            <p className="text-sm text-gray-400">Registre sua despesa ou receita</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-2 my-4 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setType('Expense')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition cursor-pointer ${type === 'Expense'
              ? 'border border-red'
              : 'text-gray-500 hover:bg-gray-50'
              }`}
          >
            <ArrowDownCircle size={16} className={
              type === 'Expense'
                ? `text-red`
                : `text-gray-400`} /> Despesa
          </button>
          <button
            onClick={() => setType('Revenue')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition cursor-pointer ${type === 'Revenue'
              ? 'border border-green'
              : 'text-gray-500 hover:bg-gray-50'
              }`}
          >
            <ArrowUpCircle size={16} className={
              type === 'Revenue'
                ? `text-success`
                : `text-gray-400`} /> Receita
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <TextField
            label="Descrição"
            placeholder="Ex. Almoço no restaurante"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Data"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="Valor"
              type="number"
              placeholder="R$ 0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <Select
            label="Categoria"
            value={categoryId}
            onChange={setCategoryId}
            options={options}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 h-12 w-full rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}
