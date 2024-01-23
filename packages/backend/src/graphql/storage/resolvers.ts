import logger from '../../logger'
import { getSystemInfo } from '../../services/storage/system'

export default {
  Query: {
    storage: async (): Promise<{
      occupiedStorageSize: number
      storageSize: number
      freeStorageSize: number
    }> => {
      try {
        return await getSystemInfo()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },

  Mutation: {},
}
