import { Stage } from '../../models'
import stages from './data'

export const stageSeed = async (context: { transaction: any }) => {
  const { transaction } = context
  return Stage.bulkCreate(stages, { transaction })
}
