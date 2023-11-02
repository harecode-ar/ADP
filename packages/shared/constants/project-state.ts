export const PROJECT_STATE = {
  NEW: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: 4,
}

export const PROJECT_STATE_ARRAY = [
  {
    id: PROJECT_STATE.NEW,
    name: 'Nuevo',
    description: 'Nuevo proyecto',
  },
  {
    id: PROJECT_STATE.IN_PROGRESS,
    name: 'En progreso',
    description: 'Proyecto en progreso',
  },
  {
    id: PROJECT_STATE.COMPLETED,
    name: 'Completado',
    description: 'Proyecto completado',
  },
  {
    id: PROJECT_STATE.CANCELLED,
    name: 'Cancelado',
    description: 'Proyecto cancelado',
  },
]
