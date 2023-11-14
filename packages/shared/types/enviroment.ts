export enum EAppMode {
  PRODUCTION = 'production',
  TESTING = 'testing',
  DEVELOPMENT = 'development',
  LOCAL = 'local',
}

export enum EAppPackage {
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  BOTH = 'both',
}

export interface IBackendEnvironment {
  APP_PORT: string
  APP_MODE: EAppMode
  APP_URL: string

  DB_HOST: string
  DB_PORT: string
  DB_DATABASE: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_DIALECT: 'mysql' | 'postgres' | 'mariadb'

  MAIL_HOST: string
  MAIL_PORT: string
  MAIL_USERNAME: string
  MAIL_PASSWORD: string

  LOG_LEVEL: string
  LOG_FILENAME: string

  JWT_SECRET: string

  STORAGE_URL: string
  STORAGE_KEY: string
}

export type IFrontendEnvironment = {
  MODE: EAppMode
  HOST_API_KEY: string
  BACKEND_URL: string
}
