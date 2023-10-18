import type { IArea } from '@adp/shared/types'
import { Area } from '../../database/models'
import logger from '../../logger'

const area = async (
  _: any,
  args: {
    id: number
  }
): Promise<IArea | null> => {
  try {
    const { id } = args
    return await Area.findByPk(id)
  } catch (error) {
    logger.error(error)
    throw error
  }
}

const areas = async (): Promise<IArea[]> => {
  try {
    return await Area.findAll()
  } catch (error) {
    logger.error(error)
    throw error
  }
}

const createArea = async (
  _: any,
  args: {
    name: string
    rolename: string
    description: string
    multiple: boolean
    parentId: number
    responsibleId: number
  }
): Promise<IArea> => {
  try {
    const {
      name,
      rolename,
      description,
      multiple,
      parentId,
      responsibleId,
    } = args
    return await Area.create({
      name,
      rolename,
      description,
      multiple,
      parentId,
      responsibleId,
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export default {
  Query: {
    area,
    areas,
  },
  Mutation: {
    createArea,
    // updateArea,
    // deleteArea
  },
}
