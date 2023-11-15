import express from 'express'
import { getFile, determineContentType } from '../services/storage'
import logger from '../logger'

const appRouter = express.Router()

appRouter.get('/file/:filename', async (request, response) => {
  try {
    const { filename } = request.params
    const file = await getFile(filename)
    const contentType = determineContentType(filename)
    response.setHeader('Content-Type', contentType)
    response.send(file)
  } catch (error) {
    logger.error(error)
    response.status(404).send('Not found')
  }
})

export { appRouter }
