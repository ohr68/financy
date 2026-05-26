import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCategories } from '../hooks/use-categories'
import { CategorySummaryCards } from '../components/categories/category-summary-cards'
import { CategoryCard } from '../components/categories/category-card'
import { CreateCategoryModal } from '../components/categories/create-category-modal'
import type { Category } from '../@types/categories/category'

export function CategoriesPage() {
  const { categories, loading, deleteCategory } = useCategories()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  function handleEdit(category: Category) {
    // TODO: open edit modal with category data
    console.log('edit', category)
  }

  async function handleDelete(id: string) {
    await deleteCategory(id)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
        Carregando...
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
          <p className="text-sm text-gray-500">Organize suas transações por categorias</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition cursor-pointer"
        >
          <Plus size={16} />
          Nova categoria
        </button>
      </div>

      <CategorySummaryCards categories={categories} />

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <CreateCategoryModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}
