import type { CategoryColor } from '../types/category'

const colorMap: Record<CategoryColor, string> = {
  Blue: 'bg-blue-light text-blue-dark',
  Green: 'bg-green-light text-green-dark',
  Orange: 'bg-orange-light text-orange-dark',
  Pink: 'bg-pink-light text-pink-dark',
  Red: 'bg-red-light text-red-dark',
  Violet: 'bg-purple-light text-purple-dark',
  Yellow: 'bg-yellow-light text-yellow-dark',
}

interface CategoryIconProps {
  icon: string
  color: CategoryColor
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-lg',
  lg: 'w-12 h-12 text-xl',
}

export function CategoryIcon({ icon, color, size = 'md' }: CategoryIconProps) {
  return (
    <div className={`flex items-center justify-center rounded-full ${colorMap[color]} ${sizeMap[size]}`}>
      <span>{icon}</span>
    </div>
  )
}
