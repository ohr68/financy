import { ApolloLink, HttpLink } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import { useAuthStore } from '../stores/auth'
 import {
   CombinedGraphQLErrors,
   CombinedProtocolErrors,
 } from "@apollo/client/errors";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql',
})


const errorLink = new ErrorLink(({ error }) => {
  const auth = useAuthStore.getState()

  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((err) => {
      const message = err.message

      console.log(
        `[GraphQL error]: ${message}`,
        err.locations,
        err.path
      )

      if (
        message.includes('Usuário não autenticado') ||
        err.extensions?.code === 'UNAUTHENTICATED'
      ) {
        auth.logout()
      }
    })
  }

  else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach((err) => {
      console.log(
        `[Protocol error]: ${err.message}`,
        err.extensions
      )
    })
  }

  else {
    console.error(`[Network error]:`, error)
  }
})


const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink, 
    httpLink]),
  cache: new InMemoryCache(),
})
