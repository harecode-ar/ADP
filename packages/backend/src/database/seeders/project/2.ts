import { TASK_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Incentivo a la Utilización de Energías Renovables',
  description:
    'Este proyecto tiene como objetivo promover el uso de energías renovables en la comunidad, fomentando la adopción de tecnologías como paneles solares, turbinas eólicas y sistemas de calefacción solar.',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  finishedAt: null,
  cost: 3000000 * 1000,
  progress: 0,
  areaId: 1,
  stateId: TASK_STATE.IN_PROGRESS,
}

export const STAGES = [
  {
    name: 'Educación y Concientización',
    description:
      'Se llevará a cabo una campaña educativa para concientizar a la comunidad sobre los beneficios de las energías renovables y las opciones disponibles.',
    startDate: '2023-01-01',
    endDate: '2023-03-31',
    finishedAt: '2023-03-15',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Subsidios y Incentivos Financieros',
    description:
      'Se establecerán programas de subsidios y incentivos financieros para ayudar a los residentes y negocios a financiar la instalación de sistemas de energía renovable.',
    startDate: '2023-04-01',
    endDate: '2023-06-30',
    finishedAt: '2023-06-28',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Asesoramiento Técnico',
    description:
      'Se proporcionará asesoramiento técnico y consultoría para ayudar a los interesados a seleccionar y diseñar sistemas de energía renovable adecuados.',
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    finishedAt: '2023-09-30',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Instalación de Tecnologías Renovables',
    description:
      'Se llevarán a cabo las instalaciones de sistemas de energía renovable, como paneles solares y turbinas eólicas, en los lugares designados.',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: TASK_STATE.IN_PROGRESS,
  },
]
