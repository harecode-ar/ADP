import { PROJECT_STATE, PROJECT_STATE_ARRAY } from '@adp/shared'

const getLabelColor = (idOrName: number | string) => {
  switch (idOrName) {
    case PROJECT_STATE.NEW:
    case PROJECT_STATE_ARRAY.find((state) => state.name === 'Nuevo')?.name:
      return 'secondary'
    case PROJECT_STATE.IN_PROGRESS:
    case PROJECT_STATE_ARRAY.find((state) => state.name === 'En progreso')?.name:
      return 'warning'
    case PROJECT_STATE.COMPLETED:
    case PROJECT_STATE_ARRAY.find((state) => state.name === 'Completado')?.name:
      return 'success'
    case PROJECT_STATE.CANCELLED:
    case PROJECT_STATE_ARRAY.find((state) => state.name === 'Cancelado')?.name:
      return 'error'
    default:
      return 'warning'
  }
}

export default getLabelColor
