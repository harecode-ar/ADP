import { PERMISSION_MAP } from '@adp/shared'
import type { IProjectNote } from '@adp/shared/types'
import { ProjectNote } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Query: {},
  Mutation: {
    createProjectNote: (
      _: any,
      args: Pick<IProjectNote, 'message' | 'projectId'>,
      context: IContext
    ): Promise<IProjectNote> => {
      try {
        needPermission([PERMISSION_MAP.PROJECT_NOTE_CREATE], context)
        return ProjectNote.create(args)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
