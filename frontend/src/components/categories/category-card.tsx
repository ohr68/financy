import { Trash, SquarePen } from 'lucide-react'
import { CategoryBadge } from './category-badge'
import { CategoryIcon } from './category-icon'
import type { Category } from '../../@types/categories/category'

interface CategoryCardProps {
  category: Category
  onDelete: (id: string) => void
  onEdit: (category: Category) => void
}

export function CategoryCard({ category, onDelete, onEdit }: CategoryCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between">
        <CategoryIcon 
          icon={category.icon} 
          color={category.color} 
          size="md" 
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDelete(category.id)}
            className="
              text-red border border-gray-300 rounded-md p-1
              hover:border-gray-200
              hover:bg-gray-300
              transition cursor-pointer
            "
          >
            <Trash size={16} />
          </button>

          <button
            onClick={() => onEdit(category)}
            className="
              text-gray-700 border border-gray-300 rounded-md p-1
              hover:border-gray-200
              hover:bg-gray-300
              transition cursor-pointer
            "
          >
            <SquarePen size={16} />
          </button>
        </div>
      </div>

      <div>
        <p className="font-semibold text-gray-800">
          {category.title}
        </p>

        <p className="text-sm text-gray-500 mt-0.5">
          {category.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <CategoryBadge 
          title={category.title} 
          color={category.color} 
        />

        <span className="text-sm text-gray-400">
          {category.countTransactions ?? 0}{' '}
          {category.countTransactions === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </div>
  )
}