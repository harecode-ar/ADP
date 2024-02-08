import type { IUser, IBackendEnvironment, INotification } from '@adp/shared'
import dotenv from 'dotenv'
import { transporter } from '..'
import generateTemplate from './template'

dotenv.config()

const { APP_URL, MAIL_USERNAME } = process.env as unknown as IBackendEnvironment

export const sendNotificationMail = (user: IUser, notification: INotification) => {
  const { firstname, lastname, email } = user
  const { title, category } = notification
  const htmlToSend = generateTemplate({ firstname, lastname, url: APP_URL, title, category })
  const mailOptions = {
    from: MAIL_USERNAME,
    to: email,
    subject: 'Notificación',
    html: htmlToSend,
  }
  return transporter.sendMail(mailOptions)
}
