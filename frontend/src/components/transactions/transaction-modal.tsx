import { useEffect, useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react'
import { useTransactions } from '../../hooks/use-transactions'
import { useCategories } from '../../hooks/use-categories'
import { TextField } from '../text-field'
import type { TransactionType } from '../../@types/transactions/transaction-type'
import { CATEGORY_ICON_MAP } from '../../@types/categories/category-icons'
import { Select } from '../select'
import type { Transaction } from '../../@types/transactions/transaction'
import { toast } from 'sonner'
import { useForm, Controller } from 'react-hook-form'

interface TransactionModalProps {
  open: boolean
  initialData?: Transaction | null
  onClose: () => void
}

function formatCurrencyDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  const numeric = parseInt(digits, 10) / 100
  return numeric.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function parseCurrencyToFloat(formatted: string): number {
  const digits = formatted.replace(/\D/g, '')
  if (!digits) return 0
  return parseInt(digits, 10) / 100
}

type TransactionForm = {
  type: TransactionType
  description: string
  amountDisplay: string
  date: string
  categoryId: string
}

export function TransactionModal({ open, onClose, initialData }: TransactionModalProps) {
  const { createTransaction, updateTransaction } = useTransactions()
  const { categories } = useCategories()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionForm>({
    defaultValues: {
      type: 'Expense',
      description: '',
      amountDisplay: '',
      date: '',
      categoryId: '',
    },
  })

  const type = watch('type')

  const options = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
    icon: CATEGORY_ICON_MAP[cat.icon as keyof typeof CATEGORY_ICON_MAP],
  }))

  useEffect(() => {
    if (!open) return

    if (!initialData) {
      reset({ type: 'Expense', description: '', amountDisplay: '', date: '', categoryId: '' })
      return
    }

    reset({
      type: initialData.type,
      description: initialData.description ?? '',
      amountDisplay: formatCurrencyDisplay(String(Math.round(initialData.amount * 100))),
      date: initialData.date.split('T')[0],
      categoryId: initialData.categoryId,
    })
  }, [initialData, open, reset])

  const onSubmit = async (data: TransactionForm) => {
    const amount = parseCurrencyToFloat(data.amountDisplay)
    setLoading(true)
    try {
      if (initialData) {
        await updateTransaction(initialData.id, data.categoryId, {
          description: data.description,
          amount,
          date: new Date(data.date).toISOString(),
          type: data.type,
        })
        toast.success('Transação atualizada com sucesso!')
      } else {
        await createTransaction(data.categoryId, {
          description: data.description,
          amount,
          date: new Date(data.date).toISOString(),
          type: data.type,
        })
        toast.success('Transação criada com sucesso!')
      }
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {initialData ? 'Editar transação' : 'Nova transação'}
            </h2>
            <p className="text-sm text-gray-400">Registre sua despesa ou receita</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
          <div className="flex gap-2 border border-gray-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setValue('type', 'Expense')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition cursor-pointer ${
                type === 'Expense' ? 'border border-red' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ArrowDownCircle size={16} className={type === 'Expense' ? 'text-red' : 'text-gray-400'} />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setValue('type', 'Revenue')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition cursor-pointer ${
                type === 'Revenue' ? 'border border-green' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ArrowUpCircle size={16} className={type === 'Revenue' ? 'text-success' : 'text-gray-400'} />
              Receita
            </button>
          </div>

          <TextField
            label="Descrição"
            placeholder="Ex. Almoço no restaurante"
            error={!!errors.description}
            {...register('description', { required: true })}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Data"
              type="date"
              error={!!errors.date}
              {...register('date', { required: true })}
            />

            <Controller
              name="amountDisplay"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Valor"
                  type="text"
                  inputMode="numeric"
                  placeholder="R$ 0,00"
                  value={field.value}
                  error={!!errors.amountDisplay}
                  onChange={(e) => field.onChange(formatCurrencyDisplay(e.target.value))}
                />
              )}
            />
          </div>

          <Controller
            name="categoryId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                label="Categoria"
                value={field.value}
                onChange={field.onChange}
                options={options}
              />
            )}
          />

          <button
            disabled={loading}
            className={`mt-2 h-12 w-full rounded-lg text-white text-sm font-semibold transition ${
              loading ? 'bg-brand/60 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark cursor-pointer'
            }`}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  )
}