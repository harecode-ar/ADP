import { PERMISSION_MAP } from '@adp/shared'
import type { IProject } from '@adp/shared/types'
import { Project } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {
    projects: (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'>[]> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    project: (
      _: any,
      args: Pick<IProject, 'id'>,
      context: IContext
    ): Promise<Omit<IProject, 'state' | 'area' | 'stages' | 'responsible'> | null> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_READ], context)
        return Project.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
