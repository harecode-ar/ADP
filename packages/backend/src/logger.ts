import type { IBackendEnvironment } from '@adp/shared'
import log4js from 'log4js'
import dotenv from 'dotenv'

dotenv.config()

const { LOG_LEVEL = 'all', LOG_FILENAME = 'cheese.log' } =
  process.env as unknown as IBackendEnvironment

log4js.configure({
  appenders: { cheese: { type: 'file', filename: LOG_FILENAME } },
  categories: { default: { appenders: ['cheese'], level: LOG_LEVEL } },
})

const logger = log4js.getLogger('logger')

export default logger
