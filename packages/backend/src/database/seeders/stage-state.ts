import { STAGE_STATE_ARRAY } from '@adp/shared'
import type { IStageState } from '@adp/shared/types'
import { StageState } from '../models'

export const stageStateSeed = (context: { transaction: any }): Promise<IStageState[]> => {
  const { transaction } = context
  return StageState.bulkCreate(STAGE_STATE_ARRAY, {
    transaction,
  })
}
