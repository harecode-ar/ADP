import type { IArea } from '@adp/shared/types'
import { Area } from '../../database/models'
import logger from '../../logger'

export default {
  Query: {
    area: (
      _: any,
      args: {
        id: number
      }
    ): Promise<IArea | null> => {
      try {
        const { id } = args
        return Area.findByPk(id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    areas: (): Promise<IArea[]> => {
      try {
        return Area.findAll()
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createArea: (
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
        const { name, rolename, description, multiple, parentId, responsibleId } = args
        return Area.create({
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
    },
    updateArea: async (
      _: any,
      args: {
        id: number
        name: string
        rolename: string
        description: string
        multiple: boolean
        parentId: number
        responsibleId: number
      }
    ): Promise<IArea | null> => {
      try {
        const { id, name, rolename, description, multiple, parentId, responsibleId } = args
        const area = await Area.findByPk(id)
        if (!area) {
          throw new Error('Area not found')
        }
        await area.update({
          name,
          rolename,
          description,
          multiple,
          parentId,
          responsibleId,
        })
        return area
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    deleteArea: async (
      _: any,
      args: {
        id: number
      }
    ): Promise<IArea | null> => {
      try {
        const { id } = args
        const area = await Area.findByPk(id)
        if (!area) {
          throw new Error('Area not found')
        }
        await area.destroy()
        return area
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
