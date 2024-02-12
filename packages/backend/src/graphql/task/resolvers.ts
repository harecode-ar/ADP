import { PERMISSION_MAP, TASK_STATE } from '@adp/shared'
import { Project, Stage } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {},
  Mutation: {
    startTask: async (
      _: any,
      args: {
        projectId?: number
        stageId?: number
      },
      context: IContext
    ): Promise<boolean> => {
      try {
        needPermission([PERMISSION_MAP.TASK_START], context)
        const { projectId, stageId } = args
        if (!projectId && !stageId) {
          throw new Error('No se ha encontrado la tarea')
        }
        let task: Project | Stage | null = null

        if (projectId) {
          task = await Project.findOne({
            where: {
              id: projectId,
              stateId: TASK_STATE.ON_HOLD,
            },
          })
        }

        if (stageId) {
          task = await Stage.findOne({
            where: {
              id: stageId,
              stateId: TASK_STATE.ON_HOLD,
            },
          })
        }

        if (!task) {
          throw new Error('No se ha encontrado la tarea')
        }

        await task.update({
          stateId: TASK_STATE.IN_PROGRESS,
        })
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    finishTask: async (
      _: any,
      args: {
        projectId?: number
        stageId?: number
      },
      context: IContext
    ): Promise<boolean> => {
      try {
        needPermission([PERMISSION_MAP.TASK_FINISH], context)
        const { projectId, stageId } = args
        if (!projectId && !stageId) {
          throw new Error('No se ha encontrado la tarea')
        }
        let task: Project | Stage | null = null

        if (projectId) {
          task = await Project.findOne({
            where: {
              id: projectId,
            },
          })
        }

        if (stageId) {
          task = await Stage.findOne({
            where: {
              id: stageId,
            },
          })
        }

        if (!task) {
          throw new Error('No se ha encontrado la tarea')
        }

        await task.update({
          stateId: TASK_STATE.COMPLETED, // Cambia a tu estado final deseado
        })
        return true
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
