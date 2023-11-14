import { EAppMode } from '@adp/shared'
import type { IBackendEnvironment } from '@adp/shared'
import dotenv from 'dotenv'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import colors from 'colors'
import path from 'path'
import next from 'next'
import { typeDefs, resolvers } from './graphql'
import { sequelize } from './database'
import './database/models'
import { getContext } from './graphql/context'
import { FRONT_PATH } from './constants'
import logger from './logger'

dotenv.config()

const { APP_PORT = '4000', APP_MODE } = process.env as unknown as IBackendEnvironment

const nextApp = next({
  dev: APP_MODE === EAppMode.LOCAL,
  dir: path.join(__dirname, FRONT_PATH),
})
const nextHandler = nextApp.getRequestHandler()

const app = express()

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: getContext,
})

if (APP_MODE !== EAppMode.LOCAL && FRONT_PATH) {
  app.use(express.static(path.join(__dirname, FRONT_PATH)))
  app.get('*', (request: any, response: any) => nextHandler(request, response))
}

async function startApolloServer() {
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })
}

startApolloServer().then(() => {
  app.listen(APP_PORT, async () => {
    try {
      await sequelize.sync({ force: false })
      // eslint-disable-next-line no-console
      console.log(`🟢 Server is running on port ${APP_PORT}`)
      // eslint-disable-next-line no-console
      console.log(`🚀 Graphiql is running on http://localhost:${APP_PORT}/graphql`)
      logger.info(`Server is running on port ${APP_PORT}`)
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(
        colors.red('🔴 Unable to connect to the database:'),
        error?.name || 'unknown error'
      )
      logger.error(error)
    }
  })
})
