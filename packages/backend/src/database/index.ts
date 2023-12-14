import type { IBackendEnvironment } from '@adp/shared'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_DIALECT = 'mysql',
} = process.env as unknown as IBackendEnvironment

export const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  logging: false,
})
