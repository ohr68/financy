import { useEffect, useState } from 'react'
import { useCategories } from '../../hooks/use-categories'
import { TextField } from '../text-field'
import type { CategoryColor } from '../../@types/categories/category-color'
import { toast } from 'sonner'
import { CATEGORY_ICON_MAP, CATEGORY_ICONS, type CategoryIconName } from '../../@types/categories/category-icons'
import { X } from 'lucide-react'
import type { Category } from '../../@types/categories/category'
import { useForm, Controller } from 'react-hook-form'

const COLORS: { label: string; value: CategoryColor; bg: string }[] = [
  { label: 'Verde', value: 'Green', bg: 'bg-green' },
  { label: 'Azul', value: 'Blue', bg: 'bg-blue' },
  { label: 'Violeta', value: 'Violet', bg: 'bg-purple' },
  { label: 'Rosa', value: 'Pink', bg: 'bg-pink' },
  { label: 'Vermelho', value: 'Red', bg: 'bg-red' },
  { label: 'Laranja', value: 'Orange', bg: 'bg-orange' },
  { label: 'Amarelo', value: 'Yellow', bg: 'bg-yellow' },
]

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  initialData?: Category | null
}

type CategoryForm = {
  title: string
  description: string
  icon: CategoryIconName
  color: CategoryColor
}

export function CategoryModal({ open, onClose, initialData }: CategoryModalProps) {
  const { createCategory, updateCategory } = useCategories()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues: {
      title: '',
      description: '',
      icon: 'Luggage',
      color: 'Green',
    },
  })

  const selectedIcon = watch('icon')
  const SelectedIcon = CATEGORY_ICON_MAP[selectedIcon]

  useEffect(() => {
    if (!open) return

    if (!initialData) {
      reset({ title: '', description: '', icon: 'Luggage', color: 'Green' })
      return
    }

    reset({
      title: initialData.title,
      description: initialData.description ?? '',
      icon: initialData.icon as CategoryIconName,
      color: initialData.color,
    })
  }, [initialData, open, reset])

  const onSubmit = async (data: CategoryForm) => {
    setLoading(true)
    try {
      if (initialData) {
        await updateCategory(initialData.id, {
          title: data.title,
          description: data.description,
          icon: data.icon,
          color: data.color,
        })
        toast.success('Categoria atualizada com sucesso!')
      } else {
        await createCategory({
          title: data.title,
          description: data.description,
          icon: data.icon,
          color: data.color,
        })
        toast.success('Categoria criada com sucesso!')
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
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {initialData ? 'Editar categoria' : 'Nova categoria'}
            </h2>
            <p className="text-sm text-gray-400">Organize suas transações com categorias</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <TextField
            label="Título"
            placeholder="Ex. Alimentação"
            icon={<SelectedIcon size={16} />}
            error={!!errors.title}
            helperText={errors.title ? 'Título é obrigatório' : undefined}
            {...register('title', { required: true })}
          />

          <TextField
            label="Descrição"
            placeholder="Descrição da categoria"
            helperText={errors.description ? 'Descrição é obrigatória' : 'Opcional'}
            error={!!errors.description}
            {...register('description')}
          />

          <div className="flex flex-col gap-2 py-1">
            <label className="text-sm font-medium text-gray-700">Ícone</label>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-8 gap-2">
                  {CATEGORY_ICONS.map((iconName) => {
                    const IconComponent = CATEGORY_ICON_MAP[iconName]
                    return (
                      <button
                        type="button"
                        key={iconName}
                        onClick={() => field.onChange(iconName)}
                        className={`
                          flex h-9 w-9 items-center justify-center rounded-lg
                          hover:bg-gray-200 transition cursor-pointer
                          ${field.value === iconName
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
              )}
            />
          </div>

          <div className="flex flex-col gap-2 py-1">
            <label className="text-sm font-medium text-gray-700">Cor</label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div className="flex w-full gap-2">
                  {COLORS.map((c) => (
                    <button
                      type="button"
                      key={c.value}
                      onClick={() => field.onChange(c.value)}
                      className={`
                        flex-1 rounded-md p-1 cursor-pointer transition
                        ${field.value === c.value ? 'ring ring-brand' : 'ring ring-gray-300'}
                      `}
                    >
                      <div className={`h-6 w-full rounded-sm ${c.bg}`} />
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          <button
            disabled={loading}
            className={`
              mt-2 h-12 w-full rounded-lg text-white text-sm font-semibold transition
              ${loading
                ? 'bg-brand/60 cursor-not-allowed'
                : 'bg-brand hover:bg-brand-dark cursor-pointer'
              }
            `}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  )
}