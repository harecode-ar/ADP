import { PERMISSION_MAP } from '@adp/shared'
import type { ITaskState } from '@adp/shared'
import { TaskState } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    taskStates: (_: any, __: any, context: IContext): Promise<ITaskState[]> => {
      try {
        needPermission([PERMISSION_MAP.TASK_STATE_READ], context)
        return TaskState.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    taskState: (
      _: any,
      args: Pick<ITaskState, 'id' | 'name'>,
      context: IContext
    ): Promise<ITaskState | null> => {
      try {
        needPermission([PERMISSION_MAP.TASK_STATE_READ], context)
        return TaskState.findOne({
          where: args,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
