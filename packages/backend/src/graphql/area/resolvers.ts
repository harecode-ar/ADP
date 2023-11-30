import { ECacheKey, ENotificationCategory, type IArea, type IUser } from '@adp/shared/types'
import { getAreaFromTree, getAreaDescendantsIds } from '@adp/shared'
import { Area, Cache, User } from '../../database/models'
import logger from '../../logger'
import { createNotification } from '../../database/jobs'
import { IContext } from '../types'

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
    areasForDashboard: async (_: any, __: any, context: IContext): Promise<IArea[]> => {
      try {
        const { user } = context
        if (!user) throw new Error('Usuario no encontrado')
        const [userAreas, cachedTree] = await Promise.all([
          Area.findAll({
            where: {
              responsibleId: user.id,
            },
            attributes: ['id'],
          }),
          Cache.findOne({
            where: {
              key: ECacheKey.AREA_TREE,
            },
          }),
        ])
        if (!cachedTree) throw new Error('Arbol de areas no encontrado')
        const tree: IArea[] = JSON.parse(cachedTree.value)
        console.log('tree', typeof tree)
        console.log('isArray', Array.isArray(tree))
        console.log(
          'userAreas',
          userAreas.map((x) => x.id)
        )
        const userAreasIds = userAreas.map((area: IArea) => area.id)
        const ids = Array.from(
          new Set<number>([
            ...userAreasIds,
            ...userAreasIds.flatMap((areaId) => {
              const areaTree = getAreaFromTree(tree, areaId)
              console.log('areaTree', JSON.stringify(areaTree, null, 2))
              if (!areaTree) return []
              return getAreaDescendantsIds(areaTree)
            }),
          ])
        )
        const areas = await Area.findAll({
          where: {
            id: ids,
          },
          order: [['parentId', 'ASC']],
        })
        return areas
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
