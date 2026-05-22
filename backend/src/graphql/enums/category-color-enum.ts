import { registerEnumType } from 'type-graphql'
import { CategoryColor } from '../../generated/prisma/enums'

registerEnumType(CategoryColor, {
  name: 'CategoryColor',
  description: 'Category color'
})

export { CategoryColor }