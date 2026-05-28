import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import { AuthResolver } from './resolvers/auth.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { buildContext } from './graphql/context'
import { TransactionResolver } from './resolvers/transaction.resolver'
import { CategoryResolver } from './resolvers/category.resolver'

async function bootstrap() {
  const app = express()

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      TransactionResolver,
      CategoryResolver
    ],
    validate: false,
    emitSchemaFile: './schema.graphql'
  })

  const server = new ApolloServer({
    schema
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext
    })
  )

  app.listen({
    port: 4000
  }, () => {
    console.log('🚀 Servidor iniciado na porta 4000')
  })
}

bootstrap()