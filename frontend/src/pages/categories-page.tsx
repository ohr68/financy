import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCategories } from '../hooks/use-categories'
import { CategorySummaryCards } from '../components/categories/category-summary-cards'
import { CategoryCard } from '../components/categories/category-card'
import { CategoryModal } from '../components/categories/category-modal'
import type { Category } from '../@types/categories/category'
import { ConfirmDialog } from '../components/confirm-dialog'
import { toast } from 'sonner'
import { useTransactions } from '../hooks/use-transactions'

export function CategoriesPage() {
  const { categories, categoryListLoading, deleteCategory, mostUsedCategory } = useCategories()
  const { countTransactions: transactionsCount } = useTransactions()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setIsCreateModalOpen(true)
  }

  function handleDelete(id: string) {
    setDeleteId(id)
  }

  async function confirmDelete() {
    if (!deleteId) return
    await deleteCategory(deleteId)
    setDeleteId(null)

    toast.success('Categoria excluída com sucesso!')
  }

  if (categoryListLoading) {
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

      <CategorySummaryCards
        categories={categories}
        mostUsedCategory={mostUsedCategory}
        transactionsCount={transactionsCount}
      />

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

      <CategoryModal
        open={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setEditingCategory(null)
        }}
        initialData={editingCategory}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir categoria?"
        message="Essa ação não pode ser desfeita."
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
