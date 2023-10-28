import type { IArea } from '@adp/shared/types'
import { Area } from '../../models'
import areas from './data'

export const areaSeed = async (context: { transaction: any }): Promise<IArea[]> => {
  const { transaction } = context
  return Area.bulkCreate(areas, { transaction })
}
