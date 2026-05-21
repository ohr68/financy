import type { MiddlewareFn } from "type-graphql/build/typings/typings/middleware";
import type { GraphqlContext } from "../graphql/context";

export const IsAuth: MiddlewareFn<GraphqlContext> = async ({ context }, next) => {
  if (!context.user) throw new Error('Usuário não autenticado!')

  return next()
}