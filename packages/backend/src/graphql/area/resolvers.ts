import { ENotificationCategory, type IArea, type IUser } from '@adp/shared/types'
import { Area, User } from '../../database/models'
import logger from '../../logger'
import { createNotification } from '../../database/jobs'

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
        if (!area) throw new Error('Area no encontrada')
        const differentResponsible = responsibleId && area.responsibleId !== responsibleId
        const previousResponsibleId = area.responsibleId
        await area.update({
          name,
          rolename,
          description,
          color,
          multiple,
          parentId,
          responsibleId,
        })
        if (differentResponsible) {
          if (previousResponsibleId) {
            await createNotification(
              {
                title: `Te han quitado la responsabilidad del area ${area.name}`,
                category: ENotificationCategory.AREA,
              },
              [previousResponsibleId]
            )
          }
          createNotification(
            {
              title: `Te han asignado la responsabilidad del area ${area.name}`,
              category: ENotificationCategory.AREA,
            },
            [responsibleId]
          )
        }
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
        const area = await Area.findByPk(id, {
          include: [
            {
              model: Area,
              as: 'children',
            },
          ],
        })
        if (!area) throw new Error('Area no encontrada')
        const { children = [] } = area as IArea
        if (children.length > 0) throw new Error('El area tiene subareas')
        await area.destroy()
        return area
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
