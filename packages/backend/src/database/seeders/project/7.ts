import { TASK_STATE } from '@adp/shared'

export const PROJECT = {
  name: 'Reparación de Veredas',
  description:
    'Este proyecto tiene como objetivo la reparación y mejora de las veredas en un área urbana específica para garantizar la seguridad y accesibilidad peatonal.',
  startDate: '2023-09-01',
  endDate: '2024-02-29',
  finishedAt: null,
  cost: 3000000 * 1000,
  progress: 0,
  areaId: 1,
  stateId: TASK_STATE.ON_HOLD,
}

export const STAGES = [
  {
    name: 'Evaluación y Planificación',
    description:
      'Se realizará una evaluación detallada de las veredas en el área objetivo y se planificarán las reparaciones necesarias.',
    startDate: '2023-09-01',
    endDate: '2023-09-15',
    finishedAt: '2023-09-15',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Adquisición de Materiales y Equipos',
    description:
      'Se adquirirán los materiales, herramientas y equipos necesarios para llevar a cabo las reparaciones de las veredas.',
    startDate: '2023-09-16',
    endDate: '2023-10-15',
    finishedAt: '2023-10-15',
    progress: 1,
    areaId: 1,
    stateId: TASK_STATE.COMPLETED,
  },
  {
    name: 'Reparación de Veredas',
    description:
      'Se llevarán a cabo las reparaciones de las veredas, incluyendo la nivelación, reparación de grietas y reemplazo de baldosas dañadas.',
    startDate: '2023-10-16',
    endDate: '2024-01-15',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: TASK_STATE.ON_HOLD,
  },
  {
    name: 'Paisajismo y Mejoras Adicionales',
    description:
      'Se realizarán mejoras paisajísticas y se agregarán elementos como bancos, papeleras y señalización para mejorar la estética y utilidad de las veredas.',
    startDate: '2024-01-16',
    endDate: '2024-02-29',
    finishedAt: null,
    progress: 0,
    areaId: 1,
    stateId: TASK_STATE.NEW,
  },
]
