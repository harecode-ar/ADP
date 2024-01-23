// import { INotification } from '@adp/shared'
import cron from 'node-cron'
import { Op } from 'sequelize'
import { TASK_STATE } from '@adp/shared'
import { Project, Stage } from '../database/models'
import logger from '../logger'

// Run every 24 hours
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date().toISOString().split('T')[0]

    const stages = await Stage.findAll({
      attributes: ['id'],
      where: {
        stateId: TASK_STATE.NEW,
        startDate: {
          [Op.lte]: today,
        },
      },
    })

    const projects = await Project.findAll({
      attributes: ['id'],
      where: {
        stateId: TASK_STATE.NEW,
        startDate: {
          [Op.lte]: today,
        },
      },
    })

    await Promise.all(
      [...projects, ...stages].map((task: Project | Stage) =>
        task.update({ stateId: TASK_STATE.ON_HOLD })
      )
    )
  } catch (error) {
    logger.error(error)
  }
})
