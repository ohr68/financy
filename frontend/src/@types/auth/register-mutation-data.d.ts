import type { User } from '@types/user'

export type RegisterMutationData = {
  register: {
    token: string
    refreshToken: string
    user: User
  }
}