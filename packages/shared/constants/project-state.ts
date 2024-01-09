export const PROJECT_STATE = {
  NEW: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: 4,
}

export const PROJECT_STATE_NAME = {
  NEW: 'Nuevo',
  IN_PROGRESS: 'En progreso',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
}

export const PROJECT_STATE_ARRAY = [
  {
    id: PROJECT_STATE.NEW,
    name: PROJECT_STATE_NAME.NEW,
    description: 'Nuevo proyecto',
  },
  {
    id: PROJECT_STATE.IN_PROGRESS,
    name: PROJECT_STATE_NAME.IN_PROGRESS,
    description: 'Proyecto en progreso',
  },
  {
    id: PROJECT_STATE.COMPLETED,
    name: PROJECT_STATE_NAME.COMPLETED,
    description: 'Proyecto completado',
  },
  {
    id: PROJECT_STATE.CANCELLED,
    name: PROJECT_STATE_NAME.CANCELLED,
    description: 'Proyecto cancelado',
  },
]
