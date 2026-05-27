import type { CategoryColor } from "../../@types/categories/category-color"
import {
  CATEGORY_ICON_MAP,
  type CategoryIconName
} from "../../@types/categories/category-icons"

const colorMap: Record<CategoryColor, string> = {
  Blue: 'bg-blue-light text-blue-dark',
  Green: 'bg-green-light text-green-dark',
  Orange: 'bg-orange-light text-orange-dark',
  Pink: 'bg-pink-light text-pink-dark',
  Red: 'bg-red-light text-red-dark',
  Violet: 'bg-purple-light text-purple-dark',
  Yellow: 'bg-yellow-light text-yellow-dark',
}

const iconColorMap: Record<CategoryColor, string> = {
  Blue: 'text-blue-dark',
  Green: 'text-green-dark',
  Orange: 'text-orange-dark',
  Pink: 'text-pink-dark',
  Red: 'text-red-dark',
  Violet: 'text-purple-dark',
  Yellow: 'text-yellow-dark',
}

interface CategoryIconProps {
  icon: string
  color: CategoryColor
  size?: 'sm' | 'md' | 'lg'
  withBackground?: boolean
}

const sizeMap = {
  sm: {
    container: 'w-8 h-8',
    icon: 16
  },
  md: {
    container: 'w-10 h-10',
    icon: 20
  },
  lg: {
    container: 'w-16 h-16',
    icon: 32
  },
}

export function CategoryIcon({
  icon,
  color,
  size = 'md',
  withBackground = true
}: CategoryIconProps) {
  const IconComponent =
    CATEGORY_ICON_MAP[icon as CategoryIconName]

  if (!IconComponent) return null

  return (
    <div
      className={`
        flex items-center justify-center
        ${withBackground ? 'rounded-md' : ''}
        ${withBackground ? colorMap[color] : iconColorMap[color]}
        ${sizeMap[size].container}
      `}
    >
      <IconComponent size={sizeMap[size].icon} />
    </div>
  )
}