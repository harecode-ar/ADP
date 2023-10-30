import type { IUser, IBackendEnvironment } from '@adp/shared/types'
import dotenv from 'dotenv'
import { transporter } from '..'
import generateTemplate from './template'

dotenv.config()

const { APP_URL, MAIL_USERNAME } = process.env as unknown as IBackendEnvironment

export const sendNewUserMail = (user: IUser, password: string) => {
  const { firstname, lastname, email } = user
  const htmlToSend = generateTemplate({ firstname, lastname, email, password, url: APP_URL })
  const mailOptions = {
    from: MAIL_USERNAME,
    to: email,
    subject: 'Usuario Creado',
    html: htmlToSend,
  }
  return transporter.sendMail(mailOptions)
}
