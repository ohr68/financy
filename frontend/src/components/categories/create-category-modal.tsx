import { useState } from 'react'
import { X } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import { TextField } from './TextField'
import type { CategoryColor } from '../types/category'

const ICONS = ['🍽️', '🚗', '❤️', '⭐', '🛒', '🎮', '🎁', '🍴', '🔧', '🏠', '📦', '📚', '🎵', '🏋️', '📱', '💳']

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
  const [icon, setIcon] = useState(ICONS[0])
  const [color, setColor] = useState<CategoryColor>('Green')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!title) return

    setLoading(true)
    try {
      await createCategory({ title, description, icon, color })
      onClose()
      resetForm()
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setIcon(ICONS[0])
    setColor('Green')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-800">Nova categoria</h2>
            <p className="text-sm text-gray-400">Organize suas transações com categorias</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <TextField
            label="Título"
            placeholder="Ex. Alimentação"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Descrição"
            placeholder="Descrição da categoria"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Ícone</label>
            <div className="grid grid-cols-8 gap-2">
              {ICONS.map((i) => (
                <button
                  key={i}
                  onClick={() => setIcon(i)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg transition cursor-pointer ${
                    icon === i ? 'bg-gray-200 ring-2 ring-brand' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Cor</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`h-8 w-8 rounded-full ${c.bg} cursor-pointer transition ${
                    color === c.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                />
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
