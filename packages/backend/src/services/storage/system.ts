import type { IBackendEnvironment } from '@adp/shared'
import axios from 'axios'
import dotenv from 'dotenv'
import logger from '../../logger'

dotenv.config()

const { STORAGE_URL, STORAGE_KEY } = process.env as unknown as IBackendEnvironment

export const getSystemInfo = async (): Promise<{
  occupiedStorageSize: number
  storageSize: number
  freeStorageSize: number
  allowedExtensions: string[]
  forbiddenExtensions: string[]
  configs: Record<string, number>
}> => {
  try {
    const response = await axios.get(`${STORAGE_URL}/api/system`, {
      headers: {
        'system-identifier-authorization': STORAGE_KEY,
      },
    })
    return response.data
  } catch (error) {
    logger.error(error)
    throw error
  }
}
