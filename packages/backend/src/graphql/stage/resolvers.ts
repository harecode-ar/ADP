import { PERMISSION_MAP } from '@adp/shared'
import type { IStage } from '@adp/shared/types'
import { Stage } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    stages: (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<IStage, 'state' | 'area' | 'parentStage' | 'childStages' | 'project'>[]> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    stage: (
      _: any,
      args: Pick<IStage, 'id'>,
      context: IContext
    ): Promise<Omit<
      IStage,
      'state' | 'area' | 'parentStage' | 'childStages' | 'project'
    > | null> => {
      try {
        needPermission([PERMISSION_MAP.STAGE_READ], context)
        return Stage.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
