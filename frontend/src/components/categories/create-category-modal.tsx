import { useState } from 'react'
import { useCategories } from '../../hooks/use-categories'
import { TextField } from '../text-field'
import type { CategoryColor } from '../../@types/categories/category-color'
import { toast } from 'sonner'
import { CATEGORY_ICON_MAP, CATEGORY_ICONS, type CategoryIconName } from '../../@types/categories/category-icons'
import { X } from 'lucide-react'

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
  const [icon, setIcon] = useState<CategoryIconName>('Luggage')
  const [color, setColor] = useState<CategoryColor>('Green')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

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

      toast.success('Categoria criada com sucesso!')
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

  const SelectedIcon = CATEGORY_ICON_MAP[icon]

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              label="Título"
              name='title'
              placeholder="Ex. Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon={<SelectedIcon size={16} />}
            />

            <TextField
              label="Descrição"
              name='description'
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText='Opcional'
            />

            <div className="flex flex-col gap-2 py-1">
              <label className="text-sm font-medium text-gray-700">
                Ícone
              </label>

              <div className="grid grid-cols-8 gap-2">
                {CATEGORY_ICONS.map((iconName) => {
                  const IconComponent = CATEGORY_ICON_MAP[iconName]

                  return (
                    <button
                      type="button"
                      key={iconName}
                      onClick={() => setIcon(iconName)}
                      className={`
                      flex h-9 w-9 items-center justify-center 
                      rounded-lg 
                      hover:bg-gray-200 transition cursor-pointer
                      ${icon === iconName
                          ? 'ring ring-brand bg-brand-light text-gray-600'
                          : 'ring ring-gray-300 bg-white text-gray-500'
                        }
                    `}
                    >
                      <IconComponent size={18} />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 py-1">
              <label className="text-sm font-medium text-gray-700">
                Cor
              </label>

              <div className="flex w-full gap-2">
                {COLORS.map((c) => (
                  <button
                    type='button'
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`
                    flex-1 rounded-md p-1
                    cursor-pointer transition
                    ${color === c.value
                        ? 'ring ring-brand'
                        : 'ring ring-gray-300'
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
              disabled={loading}
              className="mt-2 h-12 w-full rounded-lg bg-brand 
              text-white text-sm 
              font-semibold hover:bg-brand-dark 
              transition cursor-pointer 
              disabled:opacity-60"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}