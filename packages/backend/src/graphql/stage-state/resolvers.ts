import { PERMISSION_MAP } from '@adp/shared'
import type { IStageState } from '@adp/shared'
import { StageState } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    stageStates: (_: any, __: any, context: IContext): Promise<IStageState[]> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_STATE_READ], context)
        return StageState.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stageState: (
      _: any,
      args: Pick<IStageState, 'id' | 'name'>,
      context: IContext
    ): Promise<IStageState | null> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_STATE_READ], context)
        return StageState.findOne({
          where: args,
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
