import { useNavigate } from 'react-router-dom'
import { CategoryBadge } from './category-badge'
import type { CategoryColor } from '../types/category'

interface CategoryBreakdownItem {
  title: string
  icon: string
  color: string
  total: number
  count: number
}

interface CategoriesSidebarProps {
  categories: CategoryBreakdownItem[]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function CategoriesSidebar({ categories }: CategoriesSidebarProps) {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Categorias
        </span>
        <button
          onClick={() => navigate('/categories')}
          className="text-xs font-medium text-brand hover:underline flex items-center gap-1"
        >
          Gerenciar →
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <div key={cat.title} className="flex items-center justify-between">
            <CategoryBadge title={cat.title} color={cat.color as CategoryColor} />
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{cat.count} itens</span>
              <span className="font-semibold">{formatCurrency(cat.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
