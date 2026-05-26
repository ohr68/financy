import { useNavigate } from 'react-router-dom'
import { CategoryBadge } from './category-badge'
import { ChevronRight } from 'lucide-react'
import type { CategoryColor } from '../../@types/categories/category-color'

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
    <div className="rounded-2xl border border-gray-200 bg-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Categorias
        </span>

        <div className="flex items-center gap-1 hover:underline hover:cursor-pointer transition">
          <button
            onClick={() => navigate('/categories')}
            className="text-xs font-medium text-brand
            hover:cursor-pointer transition"
          >
            Gerenciar
          </button>
          <ChevronRight size={18} className="stroke-brand" />
        </div>
      </div>

      <div className="flex flex-col">
        {categories.map((cat, index) => (
          <div
            key={cat.title}
            className={`
              flex items-center justify-between px-6 py-3
              ${index !== categories.length - 1 ? 'border-b border-gray-200' : ''}
            `}
          >
            <CategoryBadge
              title={cat.title}
              color={cat.color as CategoryColor}
            />

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{cat.count} itens</span>
              <span className="font-semibold">
                {formatCurrency(cat.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
