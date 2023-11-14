import { STAGE_STATE } from '@adp/shared'

const oneDayAgo = new Date(new Date().setDate(new Date().getDate() - 1))
const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2))
const threeDaysAfter = new Date(new Date().setDate(new Date().getDate() + 3))
const fourDaysAgo = new Date(new Date().setDate(new Date().getDate() - 4))
const fourDaysAfter = new Date(new Date().setDate(new Date().getDate() + 4))
const fiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 5))
const fiveDaysAfter = new Date(new Date().setDate(new Date().getDate() + 5))
const sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6))
const sixDaysAfter = new Date(new Date().setDate(new Date().getDate() + 6))
const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7))
const sevenDaysAfter = new Date(new Date().setDate(new Date().getDate() + 7))
const eightDaysAgo = new Date(new Date().setDate(new Date().getDate() - 8))
const eightDaysAfter = new Date(new Date().setDate(new Date().getDate() + 8))
const nineDaysAfter = new Date(new Date().setDate(new Date().getDate() + 9))
const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10))
const tenDaysAfter = new Date(new Date().setDate(new Date().getDate() + 10))

export default [
  {
    id: 1,
    name: 'Etapa 1',
    description: 'Etapa 1',
    startDate: twoDaysAgo.toISOString().split('T')[0],
    endDate: fiveDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 2,
    name: 'Etapa 2',
    description: 'Etapa 2',
    startDate: fourDaysAfter.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 0.9627732281072982,
    areaId: 1,
    stateId: STAGE_STATE.CANCELLED,
    projectId: 2,
  },
  {
    id: 3,
    name: 'Etapa 3',
    description: 'Etapa 3',
    startDate: sevenDaysAfter.toISOString().split('T')[0],
    endDate: sevenDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 4,
    name: 'Etapa 4',
    description: 'Etapa 4',
    startDate: fiveDaysAfter.toISOString().split('T')[0],
    endDate: fiveDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 3,
  },
  {
    id: 5,
    name: 'Etapa 5',
    description: 'Etapa 5',
    startDate: fiveDaysAgo.toISOString().split('T')[0],
    endDate: eightDaysAfter.toISOString().split('T')[0],
    progress: 0.21949962772873777,
    areaId: 1,
    stateId: STAGE_STATE.IN_PROGRESS,
    projectId: 2,
  },
  {
    id: 6,
    name: 'Etapa 6',
    description: 'Etapa 6',
    startDate: nineDaysAfter.toISOString().split('T')[0],
    endDate: nineDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 7,
    name: 'Etapa 7',
    description: 'Etapa 7',
    startDate: oneDayAgo.toISOString().split('T')[0],
    endDate: fiveDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 8,
    name: 'Etapa 8',
    description: 'Etapa 8',
    startDate: tenDaysAgo.toISOString().split('T')[0],
    endDate: fiveDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 1,
  },
  {
    id: 9,
    name: 'Etapa 9',
    description: 'Etapa 9',
    startDate: sixDaysAgo.toISOString().split('T')[0],
    endDate: sixDaysAgo.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: STAGE_STATE.NEW,
    projectId: 2,
  },
  {
    id: 10,
    name: 'Etapa 10',
    description: 'Etapa 10',
    startDate: nineDaysAfter.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 2,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 3,
  },
  {
    id: 11,
    name: 'Etapa 11',
    description: 'Etapa 11',
    startDate: fourDaysAgo.toISOString().split('T')[0],
    endDate: sixDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 2,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 1,
  },
  {
    id: 12,
    name: 'Etapa 12',
    description: 'Etapa 12',
    startDate: fiveDaysAgo.toISOString().split('T')[0],
    endDate: sevenDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 2,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 3,
  },
  {
    id: 13,
    name: 'Etapa 13',
    description: 'Etapa 13',
    startDate: nineDaysAfter.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 1,
  },
  {
    id: 14,
    name: 'Etapa 14',
    description: 'Etapa 14',
    startDate: fiveDaysAgo.toISOString().split('T')[0],
    endDate: threeDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: STAGE_STATE.NEW,
    projectId: 2,
  },
  {
    id: 15,
    name: 'Etapa 15',
    description: 'Etapa 15',
    startDate: eightDaysAgo.toISOString().split('T')[0],
    endDate: fourDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 16,
    name: 'Etapa 16',
    description: 'Etapa 16',
    startDate: fiveDaysAgo.toISOString().split('T')[0],
    endDate: sixDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: STAGE_STATE.NEW,
    projectId: 2,
  },
  {
    id: 17,
    name: 'Etapa 17',
    description: 'Etapa 17',
    startDate: twoDaysAgo.toISOString().split('T')[0],
    endDate: twoDaysAgo.toISOString().split('T')[0],
    progress: 0.4012177361807371,
    areaId: 1,
    stateId: STAGE_STATE.IN_PROGRESS,
    projectId: 1,
  },
  {
    id: 18,
    name: 'Etapa 18',
    description: 'Etapa 18',
    startDate: tenDaysAgo.toISOString().split('T')[0],
    endDate: threeDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 19,
    name: 'Etapa 19',
    description: 'Etapa 19',
    startDate: twoDaysAgo.toISOString().split('T')[0],
    endDate: sevenDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 2,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 3,
  },
  {
    id: 20,
    name: 'Etapa 20',
    description: 'Etapa 20',
    startDate: eightDaysAfter.toISOString().split('T')[0],
    endDate: nineDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 21,
    name: 'Etapa 21',
    description: 'Etapa 21',
    startDate: eightDaysAfter.toISOString().split('T')[0],
    endDate: nineDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 1,
  },
  {
    id: 22,
    name: 'Etapa 22',
    description: 'Etapa 22',
    startDate: eightDaysAgo.toISOString().split('T')[0],
    endDate: sevenDaysAgo.toISOString().split('T')[0],
    progress: 0,
    areaId: 1,
    stateId: STAGE_STATE.NEW,
    projectId: 4,
  },
  {
    id: 23,
    name: 'Etapa 23',
    description: 'Etapa 23',
    startDate: eightDaysAfter.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 0.8654618437045696,
    areaId: 2,
    stateId: STAGE_STATE.IN_PROGRESS,
    projectId: 1,
  },
  {
    id: 24,
    name: 'Etapa 24',
    description: 'Etapa 24',
    startDate: eightDaysAfter.toISOString().split('T')[0],
    endDate: eightDaysAfter.toISOString().split('T')[0],
    progress: 0.7786219215076455,
    areaId: 1,
    stateId: STAGE_STATE.CANCELLED,
    projectId: 1,
  },
  {
    id: 25,
    name: 'Etapa 25',
    description: 'Etapa 25',
    startDate: fiveDaysAfter.toISOString().split('T')[0],
    endDate: sixDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 1,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 3,
  },
  {
    id: 26,
    name: 'Etapa 26',
    description: 'Etapa 26',
    startDate: sevenDaysAfter.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 0.3749960560043408,
    areaId: 1,
    stateId: STAGE_STATE.CANCELLED,
    projectId: 3,
  },
  {
    id: 27,
    name: 'Etapa 27',
    description: 'Etapa 27',
    startDate: sevenDaysAgo.toISOString().split('T')[0],
    endDate: oneDayAgo.toISOString().split('T')[0],
    progress: 0.08160143397194686,
    areaId: 2,
    stateId: STAGE_STATE.CANCELLED,
    projectId: 2,
  },
  {
    id: 28,
    name: 'Etapa 28',
    description: 'Etapa 28',
    startDate: threeDaysAfter.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 2,
    stateId: STAGE_STATE.COMPLETED,
    projectId: 3,
  },
  {
    id: 29,
    name: 'Etapa 29',
    description: 'Etapa 29',
    startDate: sixDaysAgo.toISOString().split('T')[0],
    endDate: twoDaysAgo.toISOString().split('T')[0],
    progress: 0.7163776070173604,
    areaId: 2,
    stateId: STAGE_STATE.CANCELLED,
    projectId: 1,
  },
  {
    id: 30,
    name: 'Etapa 30',
    description: 'Etapa 30',
    startDate: eightDaysAfter.toISOString().split('T')[0],
    endDate: eightDaysAfter.toISOString().split('T')[0],
    progress: 0.3696319166235096,
    areaId: 1,
    stateId: STAGE_STATE.IN_PROGRESS,
    projectId: 2,
  },
]
