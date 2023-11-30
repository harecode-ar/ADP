import type { ICache } from '@adp/shared/types'
import { areaTreeCacheSeed } from './area'

export const cacheSeed = async (context: { transaction: any }): Promise<ICache[]> => {
  const { transaction } = context
  const c1 = await areaTreeCacheSeed({ transaction })
  return [c1]
}
