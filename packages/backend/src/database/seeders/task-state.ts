import { TASK_STATE_ARRAY } from '@adp/shared'
import type { ITaskState } from '@adp/shared'
import { TaskState } from '../models'

export const taskStateSeed = (context: { transaction: any }): Promise<ITaskState[]> => {
  const { transaction } = context
  return TaskState.bulkCreate(TASK_STATE_ARRAY, {
    transaction,
  })
}
