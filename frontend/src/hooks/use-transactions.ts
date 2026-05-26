import type { Transaction } from '../@types/transactions/transaction'
import { LIST_TRANSACTIONS } from '../graphql/queries/transaction-queries'
import { CREATE_TRANSACTION, DELETE_TRANSACTION, UPDATE_TRANSACTION } from '../graphql/mutations/transaction-mutations'
import type { CreateTransactionInput } from '../@types/transactions/create-transaction-input'
import type { UpdateTransactionInput } from '../@types/transactions/update-transaction-input'
import { useMutation, useQuery } from '@apollo/client/react'
import type { TypedDocumentNode } from '@apollo/client'

type ListTransactionsResponse = {
  listTransactions: Transaction[]
}

const typedListTransactions =
  LIST_TRANSACTIONS as TypedDocumentNode<ListTransactionsResponse>

export function useTransactions() {
  const { data, loading, error, refetch } = useQuery(typedListTransactions)

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