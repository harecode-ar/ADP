import type { ICache } from '@adp/shared'
import { ECacheKey, buildTree } from '@adp/shared'
import { Area, Cache } from '../../models'

export const areaTreeCacheSeed = async (context: { transaction: any }): Promise<ICache> => {
  const { transaction } = context
  const areas = await Area.findAll({
    attributes: ['id', 'parentId'],
    raw: true,
    transaction,
  })
  const areaTree = buildTree(areas)
  const cache = await Cache.create(
    {
      key: ECacheKey.AREA_TREE,
      value: JSON.stringify(areaTree),
    },
    { transaction }
  )
  return cache
}
