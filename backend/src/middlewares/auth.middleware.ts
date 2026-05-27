import type { MiddlewareFn } from "type-graphql/build/typings/typings/middleware";
import type { GraphqlContext } from "../graphql/context";
import { GraphQLError } from "graphql";

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
  if (!context.user) {
      throw new GraphQLError('Usuário não autenticado!', {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    })
  }

  return next()
}