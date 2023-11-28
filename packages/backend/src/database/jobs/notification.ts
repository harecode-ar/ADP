import { ENotificationCategory } from '@adp/shared'
import { Notification, UserNotification } from '../models'
import logger from '../../logger'

export const createNotification = async (
  notification: {
    title: string
    category: ENotificationCategory
  },
  users: number[]
) => {
  try {
    const createdNotification = await Notification.create(notification)
    const userNotifications = users.map((userId) => ({
      userId,
      notificationId: createdNotification.id,
    }))
    await UserNotification.bulkCreate(userNotifications)
    return createdNotification
  } catch (error) {
    logger.error(error)
    throw error
  }
}
