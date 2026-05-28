import type { Transaction } from '../@types/transactions/transaction'
import { CATEGORY_SUMMARIES, COUNT_TRANSACTIONS, LIST_TRANSACTIONS, MOST_USED_CATEGORY } from '../graphql/queries/transaction-queries'
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from '../graphql/mutations/transaction-mutations'
import type { CreateTransactionInput } from '../@types/transactions/create-transaction-input'
import type { UpdateTransactionInput } from '../@types/transactions/update-transaction-input'
import { useMutation, useQuery } from '@apollo/client/react'
import type { TypedDocumentNode } from '@apollo/client'

type ListTransactionsResponse = {
  listTransactions: Transaction[]
}

const typedListTransactions =
  LIST_TRANSACTIONS as TypedDocumentNode<ListTransactionsResponse>

type CountTransactionsResponse = {
  countTransactions: number
}

const typedCountTransactions =
  COUNT_TRANSACTIONS as TypedDocumentNode<CountTransactionsResponse>

export function useTransactions() {
  const {
    data: transactionsList,
    loading: transactionsListLoading,
    error: transactionsListError,
    refetch: transactionsListRefetch } = useQuery(typedListTransactions)

  const {
    data: countTransactions,
    loading: countTransactionsLoading,
    error: countTransactionsError,
    refetch: countTransactionsRefetch
  } = useQuery(typedCountTransactions)

  const [createTransactionMutation] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [
      { query: LIST_TRANSACTIONS },
      { query: COUNT_TRANSACTIONS },
      { query: CATEGORY_SUMMARIES },
      { query: MOST_USED_CATEGORY }
    ],
  })

  const [updateTransactionMutation] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [
      { query: LIST_TRANSACTIONS },
      { query: CATEGORY_SUMMARIES },
      { query: MOST_USED_CATEGORY }
    ],
  })

  const [deleteTransactionMutation] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [
      { query: LIST_TRANSACTIONS },
      { query: COUNT_TRANSACTIONS },
      { query: CATEGORY_SUMMARIES },    
      { query: MOST_USED_CATEGORY }
    ],
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
    transactions: transactionsList?.listTransactions ?? [],
    transactionsListLoading,
    transactionsListError,
    transactionsListRefetch,
    countTransactions: countTransactions?.countTransactions ?? 0,
    countTransactionsError,
    countTransactionsLoading,
    countTransactionsRefetch,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}