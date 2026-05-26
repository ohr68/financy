import { useState } from 'react'
import {
  BaggageClaim,
  BookOpen,
  Car,
  Dumbbell,
  Gift,
  HeartPulse,
  House,
  Luggage,
  Mailbox,
  PawPrint,
  PiggyBank,
  ReceiptText,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  X
} from 'lucide-react'

import { useCategories } from '../../hooks/use-categories'
import { TextField } from '../text-field'
import type { CategoryColor } from '../../@types/categories/category-color'

const ICON_MAP = {
  Luggage,
  Car,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  ToolCase,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText
} as const

type IconName = keyof typeof ICON_MAP

const ICONS = Object.keys(ICON_MAP) as IconName[]

const COLORS: { label: string; value: CategoryColor; bg: string }[] = [
  { label: 'Verde', value: 'Green', bg: 'bg-green' },
  { label: 'Azul', value: 'Blue', bg: 'bg-blue' },
  { label: 'Violeta', value: 'Violet', bg: 'bg-purple' },
  { label: 'Rosa', value: 'Pink', bg: 'bg-pink' },
  { label: 'Vermelho', value: 'Red', bg: 'bg-red' },
  { label: 'Laranja', value: 'Orange', bg: 'bg-orange' },
  { label: 'Amarelo', value: 'Yellow', bg: 'bg-yellow' },
]

interface CreateCategoryModalProps {
  open: boolean
  onClose: () => void
}

export function CreateCategoryModal({ open, onClose }: CreateCategoryModalProps) {
  const { createCategory } = useCategories()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState<IconName>('Luggage')
  const [color, setColor] = useState<CategoryColor>('Green')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!title) return

    setLoading(true)
    try {
      await createCategory({
        title,
        description,
        icon,
        color
      })

      onClose()
      resetForm()
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setIcon('Luggage')
    setColor('Green')
  }

  if (!open) return null

  const SelectedIcon = ICON_MAP[icon]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              Nova categoria
            </h2>
            <p className="text-sm text-gray-400">
              Organize suas transações com categorias
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">

          <TextField
            label="Título"
            placeholder="Ex. Alimentação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            icon={<SelectedIcon size={16} />}
          />

          <TextField
            label="Descrição"
            placeholder="Descrição da categoria"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ícone
            </label>

            <div className="grid grid-cols-8 gap-2">
              {ICONS.map((iconName) => {
                const IconComponent = ICON_MAP[iconName]

                return (
                  <button
                    key={iconName}
                    onClick={() => setIcon(iconName)}
                    className={`
                      flex h-9 w-9 items-center justify-center 
                      rounded-lg text-gray-600 
                      hover:bg-gray-200 transition cursor-pointer
                      ${icon === iconName
                        ? 'ring-2 ring-brand bg-brand-light'
                        : 'ring-2 ring-gray-300 bg-white'
                      }
                    `}
                  >
                    <IconComponent size={18} />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Cor
            </label>

            <div className="flex w-full gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`
                    flex-1 rounded-md p-1
                    cursor-pointer transition
                    ${color === c.value
                                  ? 'ring-2 ring-brand'
                                  : 'ring-1 ring-gray-300'
                                }
                  `}
                >
                  <div
                    className={`
                      h-6 w-full rounded-sm ${c.bg}
                    `}
                  />
                </button>
              ))}
            </div>
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