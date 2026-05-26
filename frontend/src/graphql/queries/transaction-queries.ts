import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      amount
      date
      type
      categoryId
      totalBalance
      monthlyExpenses
      monthlyIncomes
      countTransactions
      countCategories
      mostUsedCategory {
        icon
        title
      }
      category {
        id
        title
        icon
        color
      }
      createdAt
      updatedAt
    }
  }
`