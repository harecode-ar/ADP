export const TASK_STATE = {
  NEW: 1,
  ON_HOLD: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  CANCELLED: 5,
}

export const TASK_STATE_NAME = {
  NEW: 'Nuevo',
  ON_HOLD: 'En espera',
  IN_PROGRESS: 'En progreso',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
}

export const TASK_STATE_ARRAY = [
  {
    id: TASK_STATE.NEW,
    name: TASK_STATE_NAME.NEW,
  },
  {
    id: TASK_STATE.ON_HOLD,
    name: TASK_STATE_NAME.ON_HOLD,
  },
  {
    id: TASK_STATE.IN_PROGRESS,
    name: TASK_STATE_NAME.IN_PROGRESS,
  },
  {
    id: TASK_STATE.COMPLETED,
    name: TASK_STATE_NAME.COMPLETED,
  },
  {
    id: TASK_STATE.CANCELLED,
    name: TASK_STATE_NAME.CANCELLED,
  },
]
