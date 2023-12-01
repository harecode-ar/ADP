import { PROJECT_STATE_ARRAY } from '@adp/shared'
import type { IProjectState } from '@adp/shared'
import { ProjectState } from '../models'

export const projectStateSeed = (context: { transaction: any }): Promise<IProjectState[]> => {
  const { transaction } = context
  return ProjectState.bulkCreate(PROJECT_STATE_ARRAY, {
    transaction,
  })
}
