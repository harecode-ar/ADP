import { TASK_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Cambio de Luces Halógenas por Luces LED',
  description:
    'Este proyecto tiene como objetivo la sustitución de las luces halógenas existentes por luces LED en un edificio para mejorar la eficiencia energética y reducir los costos de operación.',
  startDate: '2023-03-01',
  endDate: '2023-06-30',
  finishedAt: '2023-06-30',
  cost: 3000000 * 1000,
  progress: 1,
  areaId: 1,
  stateId: TASK_STATE.COMPLETED,
}

export const STAGES = [
  {
    name: 'Evaluación y Planificación',
    description:
      'Se llevará a cabo una evaluación detallada de las luces halógenas existentes y se planificará la instalación de las luces LED.',
    startDate: '2023-03-01',
    endDate: '2023-03-15',
    finishedAt: '2023-03-15',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Adquisición de Luces LED',
    description: 'Se comprarán las luces LED necesarias y se gestionarán los suministros.',
    startDate: '2023-03-16',
    endDate: '2023-04-15',
    finishedAt: '2023-04-15',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Instalación de Luces LED',
    description:
      'Se llevará a cabo la instalación de las luces LED en todo el edificio, reemplazando las luces halógenas existentes.',
    startDate: '2023-04-16',
    endDate: '2023-06-15',
    finishedAt: '2023-06-15',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Pruebas y Ajustes',
    description:
      'Se realizarán pruebas de funcionamiento y se realizarán ajustes necesarios para garantizar un rendimiento óptimo de las luces LED.',
    startDate: '2023-06-16',
    endDate: '2023-06-30',
    finishedAt: '2023-06-30',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
]
