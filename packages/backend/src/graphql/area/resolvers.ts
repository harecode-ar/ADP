import type { IArea, IUser } from '@adp/shared/types'
import { Area, User } from '../../database/models'
import logger from '../../logger'

export default {
  Area: {
    parent: (area: IArea): Promise<IArea | null> => {
      if (area.parent) return Promise.resolve(area.parent)
      if (!area.parentId) return Promise.resolve(null)
      return Area.findByPk(area.parentId)
    },
    responsible: (area: IArea): Promise<IUser | null> => {
      if (area.responsible) return Promise.resolve(area.responsible)
      if (!area.responsibleId) return Promise.resolve(null)
      return User.findByPk(area.responsibleId)
    },
  },
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
        return Area.findAll({
          order: [['parentId', 'ASC']],
        })
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
        color: string
        multiple: boolean
        parentId?: number
        responsibleId?: number
      }
    ): Promise<IArea> => {
      try {
        const { name, rolename, description, color, multiple, parentId, responsibleId } = args
        return Area.create({
          name,
          rolename,
          description,
          color,
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
        color: string
        multiple: boolean
        parentId?: number
        responsibleId?: number
      }
    ): Promise<IArea | null> => {
      try {
        const { id, name, rolename, description, color, multiple, parentId, responsibleId } = args
        const area = await Area.findByPk(id)
        if (!area) {
          throw new Error('Area not found')
        }
        await area.update({
          name,
          rolename,
          description,
          color,
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
        const children = await Area.findAll({
          where: {
            parentId: id,
          },
        })
        if (children.length > 0) {
          throw new Error('Area has children')
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
