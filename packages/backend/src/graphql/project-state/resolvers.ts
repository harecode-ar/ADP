import { PERMISSION_MAP } from '@adp/shared'
import type { IProjectState } from '@adp/shared/types'
import { ProjectState } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    projectStates: (_: any, __: any, context: IContext): Promise<IProjectState[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_STATE_READ], context)
        return ProjectState.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    projectState: (
      _: any,
      args: Pick<IProjectState, 'id' | 'name'>,
      context: IContext
    ): Promise<IProjectState | null> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_STATE_READ], context)
        return ProjectState.findOne({
          where: args,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
