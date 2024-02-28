import { TASK_STATE, TASK_STATE_NAME } from '@adp/shared'

const getLabelColor = (idOrName: number | string) => {
  switch (idOrName) {
    case TASK_STATE.NEW:
    case TASK_STATE_NAME.NEW:
      return 'statisticsNew'
    case TASK_STATE.ON_HOLD:
    case TASK_STATE_NAME.ON_HOLD:
      return 'statisticsOnHold'
    case TASK_STATE.IN_PROGRESS:
    case TASK_STATE_NAME.IN_PROGRESS:
      return 'statisticsInProgress'
    case TASK_STATE.COMPLETED:
    case TASK_STATE_NAME.COMPLETED:
      return 'statisticsCompleted'
    case TASK_STATE.CANCELLED:
    case TASK_STATE_NAME.CANCELLED:
      return 'statisticsCancelled'
    default:
      return 'warning'
  }
}

export default getLabelColor
