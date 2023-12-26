import { PROJECT_STATE, STAGE_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Creación de Plaza Pública',
  description:
    'Este proyecto tiene como objetivo la creación de una hermosa plaza pública en el centro de la ciudad para el disfrute de la comunidad.',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  finishedAt: null,
  cost: 3000000 * 1000,
  progress: 0,
  areaId: 1,
  stateId: PROJECT_STATE.IN_PROGRESS,
}

export const STAGES = [
  {
    name: 'Planificación y Diseño',
    description:
      'En esta etapa se llevará a cabo la planificación y el diseño de la plaza, incluyendo la elección de características, mobiliario urbano y paisajismo.',
    startDate: '2023-01-01',
    endDate: '2023-03-31',
    finishedAt: '2023-03-31',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
  {
    name: 'Adquisición de Terreno',
    description:
      'Se adquirirá el terreno necesario para la construcción de la plaza y se llevarán a cabo los trámites legales correspondientes.',
    startDate: '2023-04-01',
    endDate: '2023-05-31',
    finishedAt: '2023-05-31',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
  {
    name: 'Construcción de Infraestructura',
    description:
      'Se llevarán a cabo las obras de infraestructura, como pavimentación, instalación de iluminación y sistemas de riego, y construcción de áreas de juego.',
    startDate: '2023-06-01',
    endDate: '2023-09-30',
    finishedAt: '2023-09-30',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
  {
    name: 'Paisajismo y Vegetación',
    description:
      'En esta etapa se trabajará en el paisajismo de la plaza, la plantación de árboles y arbustos, y la creación de zonas verdes.',
    startDate: '2023-10-01',
    endDate: '2023-11-30',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.IN_PROGRESS,
  },
  {
    name: 'Finalización y Entrega',
    description:
      'Se realizarán las últimas mejoras, se instalarán bancos y señalización, y se entregará la plaza a la comunidad.',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
  },
]
