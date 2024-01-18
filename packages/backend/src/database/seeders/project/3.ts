import { TASK_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Construcción de Hospital',
  description:
    'Este proyecto tiene como objetivo la construcción de un hospital moderno y completamente equipado para brindar servicios médicos de alta calidad a la comunidad.',
  startDate: '2023-01-01',
  endDate: '2024-12-31',
  finishedAt: null,
  cost: 3000000 * 1000,
  progress: 0,
  areaId: 1,
  stateId: TASK_STATE.IN_PROGRESS,
}

export const STAGES = [
  {
    name: 'Planificación y Diseño',
    description:
      'Se realizará la planificación y el diseño detallado del hospital, incluyendo la selección de ubicación, diseño arquitectónico y planificación de infraestructura.',
    startDate: '2023-01-01',
    endDate: '2023-03-31',
    finishedAt: '2023-03-28',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Adquisición de Terreno',
    description:
      'Se adquirirá el terreno necesario para la construcción del hospital y se llevarán a cabo los trámites legales correspondientes.',
    startDate: '2023-04-01',
    endDate: '2023-06-30',
    finishedAt: '2023-06-25',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Construcción de Infraestructura',
    description:
      'Se llevarán a cabo las obras de construcción del edificio del hospital, incluyendo cimientos, estructura y servicios públicos.',
    startDate: '2023-07-01',
    endDate: '2024-06-30',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: TASK_STATE.IN_PROGRESS,
  },
  {
    name: 'Equipamiento y Mobiliario',
    description:
      'Se adquirirán equipos médicos, mobiliario hospitalario y sistemas de información para equipar completamente el hospital.',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: TASK_STATE.NEW,
  },
  {
    name: 'Pruebas y Certificación',
    description:
      'Se realizarán pruebas de funcionamiento y se obtendrán las certificaciones necesarias para garantizar la seguridad y calidad de los servicios médicos.',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: TASK_STATE.NEW,
  },
]
