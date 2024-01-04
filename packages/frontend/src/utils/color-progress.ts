import { PROJECT_STATE, PROJECT_STATE_NAME } from '@adp/shared'

const getLabelColor = (idOrName: number | string) => {
  switch (idOrName) {
    case PROJECT_STATE.NEW:
    case PROJECT_STATE_NAME.NEW:
      return 'secondary'
    case PROJECT_STATE.IN_PROGRESS:
    case PROJECT_STATE_NAME.IN_PROGRESS:
      return 'warning'
    case PROJECT_STATE.COMPLETED:
    case PROJECT_STATE_NAME.COMPLETED:
      return 'success'
    case PROJECT_STATE.CANCELLED:
    case PROJECT_STATE_NAME.CANCELLED:
      return 'error'
    default:
      return 'warning'
  }
}

export default getLabelColor
