import { GET_USER } from '../graphql/queries/user-queries'
import type { User } from '../@types/users/user'
import { useMutation, useQuery } from '@apollo/client/react'
import type { TypedDocumentNode } from '@apollo/client'
import { useAuthStore } from '../stores/auth'
import type { UpdateUserInput } from '../@types/users/update-user-input'
import { UPDATE_USER } from '../graphql/mutations/user-mutations'

type GetUserResponse = {
  getUser: User
}

const typedGetUser =
  GET_USER as TypedDocumentNode<GetUserResponse>

type UpdateUserResponse = {
  updateUser: User
}

const typedUpdateUser =
  UPDATE_USER as TypedDocumentNode<UpdateUserResponse>

export function useUser() {
  const user = useAuthStore((state) => state.user)

  const { loading, error } = useQuery(typedGetUser, {
    variables: { id: user?.id },
    skip: !user?.id,
  })

  const [updateUserMutation] = useMutation(typedUpdateUser)

  async function updateUser(
    data: UpdateUserInput
  ) {
    const result = await updateUserMutation({
      variables: {
        data,
      },
    })

    return result.data?.updateUser
  }

  return {
    user,
    loading,
    error,
    updateUser,
  }
}