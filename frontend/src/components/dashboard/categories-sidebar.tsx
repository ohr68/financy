import { useNavigate } from 'react-router-dom'
import { CategoryBadge } from '../categories/category-badge'
import { ChevronRight } from 'lucide-react'
import type { CategoryColor } from '../../@types/categories/category-color'
import type { CategorySummary } from '../../@types/categories/category-summary'


interface CategoriesSidebarProps {
  categories: CategorySummary[]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function CategoriesSidebar({ categories }: CategoriesSidebarProps) {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-gray-200 bg-white flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
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

      <div className="flex flex-col py-3">
        {categories?.map((cat) => (
          <div
            key={cat.categoryId}
            className='flex items-center justify-between py-3 px-5'
          >
            <CategoryBadge
              title={cat.title}
              color={cat.color as CategoryColor}
            />

            <div className="flex items-center gap-4 text-sm">
              <span className='text-gray-600'>{cat.totalTransactions} itens</span>
              <span className="font-semibold text-gray-800">
                {formatCurrency(cat.net)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
