import { useQuery, useMutation } from '@apollo/client'
import { LIST_TRANSACTIONS } from '../graphql/queries'
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from '../graphql/mutations'
import type { Transaction, CreateTransactionInput, UpdateTransactionInput } from '../types/transaction'

export function useTransactions() {
  const { data, loading, error, refetch } = useQuery<{ listTransactions: Transaction[] }>(
    LIST_TRANSACTIONS
  )

  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: LIST_TRANSACTIONS }],
  })

  const [updateTransactionMutation] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [{ query: LIST_TRANSACTIONS }],
  })

  const [deleteTransactionMutation] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: LIST_TRANSACTIONS }],
  })

  async function createTransaction(categoryId: string, data: CreateTransactionInput) {
    await createTransactionMutation({ variables: { categoryId, data } })
  }

  async function updateTransaction(
    id: string,
    categoryId: string,
    data: UpdateTransactionInput
  ) {
    await updateTransactionMutation({ variables: { id, categoryId, data } })
  }

  async function deleteTransaction(id: string) {
    await deleteTransactionMutation({ variables: { id } })
  }

  return {
    transactions: data?.listTransactions ?? [],
    loading,
    error,
    refetch,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}