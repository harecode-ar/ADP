import { TASK_STATE } from '@adp/shared'
import { Op } from 'sequelize'
import { Project, Stage } from '../models'
import logger from '../../logger'

export const calculateProjectProgress = async (projectId: number) => {
  try {
    const foundProject = await Project.findByPk(projectId)

    if (!foundProject) throw new Error('Project not found')

    const stages = await Stage.findAll({
      where: { projectId, stateId: { [Op.ne]: TASK_STATE.CANCELLED } },
      attributes: ['progress'],
    })

    if (stages.length === 0) return

    const totalProgress = stages.reduce((acc, stage) => acc + stage.progress, 0)
    const progress = totalProgress / stages.length
    await foundProject.update({ progress })
  } catch (error) {
    logger.error(error)
    throw error
  }
}
