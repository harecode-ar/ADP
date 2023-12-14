import type { IUser, IBackendEnvironment } from '@adp/shared'
import dotenv from 'dotenv'
import { transporter } from '..'
import generateTemplate from './template'

dotenv.config()

const { MAIL_USERNAME } = process.env as unknown as IBackendEnvironment

export const sendResetPasswordMail = (user: IUser, resetLink: string) => {
  const { firstname, lastname, email } = user
  const htmlToSend = generateTemplate({ firstname, lastname, email, resetLink })
  const mailOptions = {
    from: MAIL_USERNAME,
    to: email,
    subject: 'Recuperar contraseña',
    html: htmlToSend,
  }
  return transporter.sendMail(mailOptions)
}
