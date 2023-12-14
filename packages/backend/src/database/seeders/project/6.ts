import { PROJECT_STATE, STAGE_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Instalación de Radares de Velocidad en la Ruta',
  description:
    'Este proyecto tiene como objetivo mejorar la seguridad vial en una ruta al instalar radares de velocidad para controlar el exceso de velocidad de los conductores.',
  startDate: '2023-04-01',
  endDate: '2023-07-31',
  cost: 3000000 * 1000,
  progress: 1,
  areaId: 1,
  stateId: PROJECT_STATE.COMPLETED,
}

export const STAGES = [
  {
    name: 'Planificación y Evaluación',
    description:
      'Se realizará una evaluación de la ruta y se planificará la ubicación estratégica de los radares de velocidad.',
    startDate: '2023-04-01',
    endDate: '2023-04-15',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
  {
    name: 'Adquisición de Radares',
    description:
      'Se adquirirán los radares de velocidad necesarios y se gestionarán los suministros.',
    startDate: '2023-04-16',
    endDate: '2023-05-15',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
  {
    name: 'Instalación de Radares',
    description:
      'Se llevará a cabo la instalación de los radares de velocidad en las ubicaciones planificadas.',
    startDate: '2023-05-16',
    endDate: '2023-07-15',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
  {
    name: 'Pruebas y Ajustes',
    description:
      'Se realizarán pruebas de funcionamiento y se ajustarán los radares para garantizar su precisión y efectividad.',
    startDate: '2023-07-16',
    endDate: '2023-07-31',
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
  },
]
