import type { CategoryColor } from "../../@types/categories/category-color";


const colorMap: Record<CategoryColor, { bg: string; text: string }> = {
  Blue: { bg: 'bg-blue-light', text: 'text-blue-dark' },
  Green: { bg: 'bg-green-light', text: 'text-green-dark' },
  Orange: { bg: 'bg-orange-light', text: 'text-orange-dark' },
  Pink: { bg: 'bg-pink-light', text: 'text-pink-dark' },
  Red: { bg: 'bg-red-light', text: 'text-red-dark' },
  Violet: { bg: 'bg-purple-light', text: 'text-purple-dark' },
  Yellow: { bg: 'bg-yellow-light', text: 'text-yellow-dark' },
}

interface CategoryBadgeProps {
  title: string
  color: CategoryColor
}

export function CategoryBadge({ title, color }: CategoryBadgeProps) {
  const { bg, text } = colorMap[color]

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${bg} ${text}`}>
      {title}
    </span>
  )
}
