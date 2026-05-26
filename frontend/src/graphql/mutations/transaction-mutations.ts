import { gql } from "@apollo/client"

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($categoryId: String!, $data: CreateTransactionInput!) {
    createTransaction(categoryId: $categoryId, data: $data) {
      id
      description
      amount
      date
      type
      categoryId
      category {
        id
        title
        icon
        color
      }
      createdAt
    }
  }
`
 
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $categoryId: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, categoryId: $categoryId, data: $data) {
      id
      description
      amount
      date
      type
      categoryId
      category {
        id
        title
        icon
        color
      }
      updatedAt
    }
  }
`
 
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`