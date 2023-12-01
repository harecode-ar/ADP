import type { INotification, IUserNotification } from '@adp/shared/types'
import { Notification, UserNotification } from '../../database/models'
import logger from '../../logger'
import { IContext } from '../types'

export default {
  Notification: {
    read: (notification: INotification) => Boolean(notification.read),
  },
  Query: {
    notifications: async (_: any, __: any, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        const userNotifications = (await UserNotification.findAll({
          where: { userId: context.user.id },
          include: [
            {
              model: Notification,
              as: 'notification',
            },
          ],
          order: [['createdAt', 'DESC']],
        })) as IUserNotification[]

        const notifications: INotification[] = []

        userNotifications.forEach((userNotification) => {
          if (!userNotification.notification) return
          notifications.push({
            // @ts-ignore
            ...userNotification.notification.dataValues,
            read: userNotification.read,
          })
        })

        return notifications
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    readNotifications: async (_: any, { ids }: { ids: number[] }, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        await UserNotification.update(
          { read: true },
          {
            where: { userId: context.user.id, notificationId: ids },
          }
        )

        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    unreadNotifications: async (_: any, { ids }: { ids: number[] }, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        await UserNotification.update(
          { read: false },
          {
            where: { userId: context.user.id, notificationId: ids },
          }
        )

        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    removeNotifications: async (_: any, { ids }: { ids: number[] }, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        await UserNotification.destroy({
          where: { userId: context.user.id, notificationId: ids },
        })

        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
