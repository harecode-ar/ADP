import { MIME_TYPE_MAP } from '@adp/shared'
import type { IBackendEnvironment } from '@adp/shared'
import axios from 'axios'
import dotenv from 'dotenv'
import FormData from 'form-data'
import logger from '../../logger'

dotenv.config()

const { STORAGE_URL, STORAGE_KEY } = process.env as unknown as IBackendEnvironment

export const uploadFile = async (
  file: any,
  filename: string
): Promise<{
  filename: string
  extension: string
  createdAt: string
  size: number
}> => {
  try {
    // @ts-ignore
    FormData.prototype[Symbol.toStringTag] = 'FormData'

    const formData = new FormData()
    formData.append('file', file, filename)
    const formHeaders = formData.getHeaders()

    const response = await axios.post(`${STORAGE_URL}/api/file`, formData, {
      headers: {
        ...formHeaders,
        'system-identifier-authorization': STORAGE_KEY,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const uploadFiles = async (
  files: {
    file: any
    filename: string
  }[]
) => {
  try {
    // @ts-ignore
    FormData.prototype[Symbol.toStringTag] = 'FormData'

    const formData = new FormData()
    files.forEach(({ file, filename }) => formData.append(filename, file))
    const formHeaders = formData.getHeaders()

    const response = await axios.post(`${STORAGE_URL}/api/files`, formData, {
      headers: {
        ...formHeaders,
        'system-identifier-authorization': STORAGE_KEY,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const deleteFile = async (filename: string) => {
  try {
    const response = await axios.delete(`${STORAGE_URL}/api/file/${filename}`, {
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

export const deleteFiles = async (filenames: string[]) => {
  try {
    await Promise.allSettled(filenames.map((filename) => deleteFile(filename)))
    return true
  } catch (error) {
    logger.error(error)
  }
  return false
}

export const getFile = async (filename: string) => {
  try {
    const { data: file } = await axios.get(`${STORAGE_URL}/api/file/${STORAGE_KEY}/${filename}`, {
      responseType: 'arraybuffer',
    })
    return file
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const determineContentType = (filename: string) => {
  const undottedExtension = filename.split('.').pop()
  const extension = `.${undottedExtension}` as keyof typeof MIME_TYPE_MAP
  return MIME_TYPE_MAP[extension] || 'application/octet-stream'
}
