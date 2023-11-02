import type { IArea } from '@adp/shared'
import { Area, User } from '../models'
import logger from '../../logger'

export const calculateAreaTree = async (): Promise<IArea> => {
  try {
    const areas = await Area.findAll({
      include: [
        {
          model: User,
          as: 'responsible',
        },
      ],
    })

    const dataValues: IArea[] = areas.map((area) => area.dataValues)

    const tree = buildAreaTree(dataValues, null)

    return tree[0]
  } catch (error) {
    logger.error(error)
    throw error
  }
}

function buildAreaTree(areas: IArea[], parentId: number | null): IArea[] {
  const children: IArea[] = []

  areas.forEach((area) => {
    if (area.parentId === parentId) {
      const childArea = {
        ...area,
        children: buildAreaTree(areas, area.id),
      }
      children.push(childArea)
    }
  })

  return children
}
