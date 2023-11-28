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
    readNotification: async (_: any, { id }: { id: number }, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        const userNotification = await UserNotification.findOne({
          where: { userId: context.user.id, notificationId: id },
        })

        if (!userNotification) throw new Error('Notificacion no encontrada')

        userNotification.read = true
        await userNotification.save()

        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    unreadNotification: async (_: any, { id }: { id: number }, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        const userNotification = await UserNotification.findOne({
          where: { userId: context.user.id, notificationId: id },
        })

        if (!userNotification) throw new Error('Notificacion no encontrada')

        userNotification.read = false
        await userNotification.save()

        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    readAllNotifications: async (_: any, __: any, context: IContext) => {
      try {
        if (!context.user) throw new Error('No autorizado')
        await UserNotification.update(
          { read: true },
          {
            where: { userId: context.user.id },
          }
        )

        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
