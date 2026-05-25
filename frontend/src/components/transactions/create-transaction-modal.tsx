import { useState } from 'react'
import { X } from 'lucide-react'
import { useTransactions } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import { TextField } from '../text-field'
import type { TransactionType } from '../types/transaction'

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

        <div className="flex gap-2 my-4">
          <button
            onClick={() => setType('Expense')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition cursor-pointer ${
              type === 'Expense'
                ? 'border-danger text-danger bg-red-light'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-danger">⊖</span> Despesa
          </button>
          <button
            onClick={() => setType('Revenue')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition cursor-pointer ${
              type === 'Revenue'
                ? 'border-success text-success bg-green-light'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-success">⊕</span> Receita
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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:border-2 bg-white"
            >
              <option value="">Selecione</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.title}
                </option>
              ))}
            </select>
          </div>

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
