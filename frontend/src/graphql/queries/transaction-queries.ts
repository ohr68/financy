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

export const COUNT_TRANSACTIONS = gql`
  query CountTransactions {
    countTransactions
  }
`

export const CATEGORY_SUMMARIES = gql`
  query CategorySummaries {
    categorySummaries {
      categoryId
      title
      color
      totalTransactions
      totalIncome
      totalExpenses
      net
    }
  }
`

export const MOST_USED_CATEGORY = gql`
  query MostUsedCategory {
    mostUsedCategory {
      title
      icon
      color
    }
  }
`