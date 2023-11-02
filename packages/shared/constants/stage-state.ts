export const STAGE_STATE = {
  NEW: 1,
  IN_PROGRESS: 2,
  COMPLETED: 3,
  CANCELLED: 4,
}

export const STAGE_STATE_ARRAY = [
  {
    id: STAGE_STATE.NEW,
    name: 'Nuevo',
    description: 'Nueva etapa',
  },
  {
    id: STAGE_STATE.IN_PROGRESS,
    name: 'En progreso',
    description: 'Etapa en progreso',
  },
  {
    id: STAGE_STATE.COMPLETED,
    name: 'Completado',
    description: 'Etapa completada',
  },
  {
    id: STAGE_STATE.CANCELLED,
    name: 'Cancelado',
    description: 'Etapa cancelada',
  },
]
