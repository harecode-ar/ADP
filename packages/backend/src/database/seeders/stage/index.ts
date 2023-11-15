import { Stage } from '../../models'
import { STAGES } from '../project/data'

export const stageSeed = async (context: { transaction: any }) => {
  const { transaction } = context
  return Stage.bulkCreate(STAGES, { transaction })
}
