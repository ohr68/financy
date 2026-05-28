import { Tag, ArrowDownUp } from 'lucide-react'
import { CategoryIcon } from './category-icon'
import type { Category } from '../../@types/categories/category'
import type { MostUsedCategory } from '../../@types/categories/most-used-category'

interface CategorySummaryCardsProps {
  categories: Category[]
  mostUsedCategory?: MostUsedCategory | null | undefined
  transactionsCount?: number
}

export function CategorySummaryCards({ categories, mostUsedCategory, transactionsCount }: CategorySummaryCardsProps) {
  const totalCategories = categories.length

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Tag size={20} className="text-gray-500" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-800">{totalCategories}</p>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Total de categorias</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <ArrowDownUp size={20} className="text-gray-500" />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-800">{transactionsCount}</p>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Total de transações</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex items-center gap-4">
        {mostUsedCategory && (
          <CategoryIcon 
            icon={mostUsedCategory.icon} 
            color={mostUsedCategory.color} 
            withBackground={false} size="lg" />
        )}
        <div className='flex flex-col space-y-1.5'>
          <p className="text-3xl font-bold text-gray-800">{mostUsedCategory?.title ?? '—'}</p>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Categoria mais utilizada</p>
        </div>
      </div>
    </div>
  )
}
