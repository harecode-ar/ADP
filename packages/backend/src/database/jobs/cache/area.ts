import { ECacheKey, buildTree } from '@adp/shared'
import { isEqual } from 'lodash'
import { Area, Cache } from '../../models'
import logger from '../../../logger'

export const generateAreaTreeCache = async () => {
  try {
    const [cache, areas] = await Promise.all([
      Cache.findOne({
        where: { key: ECacheKey.AREA_TREE },
      }),
      Area.findAll({
        attributes: ['id', 'parentId'],
        raw: true,
      }),
    ])

    const areaTree = buildTree(areas)

    if (!cache) {
      await Cache.create({
        key: ECacheKey.AREA_TREE,
        value: JSON.stringify(areaTree),
      })
    } else if (!isEqual(cache.value, areaTree)) {
      await cache.update({ value: JSON.stringify(areaTree) })
    }
  } catch (error) {
    logger.error(error)
  }
}
