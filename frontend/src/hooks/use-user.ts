import { useQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import { useAuthContext } from '../contexts/auth-context'
import type { User } from '../types/user'

export function useUser() {
  const { user } = useAuthContext()

  const { data, loading, error } = useQuery<{ getUser: User }>(GET_USER, {
    variables: { id: user?.id },
    skip: !user?.id,
  })

  return {
    user: data?.getUser ?? user,
    loading,
    error,
  }
}