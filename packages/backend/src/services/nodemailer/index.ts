import type { IBackendEnvironment } from '@adp/shared/types'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
export * from './reset-password'

dotenv.config()

const { MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD } =
  process.env as unknown as IBackendEnvironment

const TRANSPORT_OPTIONS = {
  name: MAIL_USERNAME,
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
} as nodemailer.TransportOptions

export const transporter = nodemailer.createTransport(TRANSPORT_OPTIONS)
