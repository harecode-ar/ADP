import { INotification } from '@adp/shared'
import cron from 'node-cron'
import { Notification, User } from '../database/models'
import logger from '../logger'

// Run every 24 hours
cron.schedule('0 0 * * *', async () => {
  try {
    const notifications = await Notification.findAll({
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id'],
        },
      ],
    })

    await Promise.all(
      notifications.map((notification) => {
        // @ts-ignore
        const { users = [] } = notification as INotification
        if (!users.length) return notification.destroy()
        return Promise.resolve()
      })
    )
  } catch (error) {
    logger.error(error)
  }
})
