import type { IUser, IFileRecord } from '@adp/shared'
import { FileRecord, User } from '../../database/models'
import logger from '../../logger'

export default {
  Contact: {
    user: async (parent: IFileRecord): Promise<IUser | undefined> => {
      if (parent.user) return parent.user
      try {
        const fileRecord = (await FileRecord.findByPk(parent.id, {
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        })) as IFileRecord | null
        if (!fileRecord) throw new Error('No autorizado')
        return fileRecord.user || undefined
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Query: {},
  Mutation: {},
}
