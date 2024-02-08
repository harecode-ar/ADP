import { ENotificationCategory, INotification } from '@adp/shared'
import { Notification, User, UserNotification } from '../database/models'
import { sendNotificationMail } from '../services/nodemailer/notification'

interface TSettings {
  title: string
  category: ENotificationCategory
  userIds: number[]
  email?: boolean
}

export const sendNotification = async (settings: TSettings) => {
  const { title, category, userIds, email = false } = settings

  const notification = await Notification.create({
    title,
    category,
  })

  const users = await User.findAll({
    where: {
      id: userIds,
    },
    attributes: ['id', 'email', 'firstname', 'lastname'],
  })

  await UserNotification.bulkCreate(
    users.map((user) => ({
      userId: user.id,
      notificationId: notification.id,
    }))
  )

  if (email) {
    users.forEach((user) => {
      sendNotificationMail(user, notification as INotification)
    })
  }
}
