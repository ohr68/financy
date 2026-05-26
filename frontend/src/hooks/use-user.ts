import { GET_USER } from '../graphql/queries/user-queries'
import type { User } from '../@types/users/user'
import { useQuery } from '@apollo/client/react'
import type { TypedDocumentNode } from '@apollo/client'
import { useAuthStore } from '../stores/auth'

type GetUserResponse = {
  getUser: User
}

const typedGetUser =
  GET_USER as TypedDocumentNode<GetUserResponse>

export function useUser() {
  const user = useAuthStore((state) => state.user)

  const { data, loading, error } = useQuery(typedGetUser, {
    variables: { id: user?.id },
    skip: !user?.id,
  })

  return {
    user: data?.getUser ?? user,
    loading,
    error,
  }
}