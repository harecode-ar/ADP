import { PROJECT_STATE } from '@adp/shared'

const fiveDaysAgo = new Date(new Date().setDate(new Date().getDate() - 5))
const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7))
const nineDaysAfter = new Date(new Date().setDate(new Date().getDate() + 9))
const tenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 10))
const tenDaysAfter = new Date(new Date().setDate(new Date().getDate() + 10))

export default [
  {
    id: 1,
    name: 'Proyecto A',
    description: 'Proyecto A',
    cost: '1000000',
    startDate: tenDaysAgo.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 2,
    stateId: PROJECT_STATE.IN_PROGRESS,
  },
  {
    id: 2,
    name: 'Proyecto B',
    description: 'Proyecto B',
    cost: '2000000',
    startDate: sevenDaysAgo.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 3,
    stateId: PROJECT_STATE.IN_PROGRESS,
  },
  {
    id: 3,
    name: 'Proyecto C',
    description: 'Proyecto C',
    cost: '3000000',
    startDate: fiveDaysAgo.toISOString().split('T')[0],
    endDate: tenDaysAfter.toISOString().split('T')[0],
    progress: 1,
    areaId: 2,
    stateId: PROJECT_STATE.COMPLETED,
  },
  {
    id: 4,
    name: 'Proyecto D',
    description: 'Proyecto D',
    cost: '4000000',
    startDate: tenDaysAgo.toISOString().split('T')[0],
    endDate: nineDaysAfter.toISOString().split('T')[0],
    progress: 0,
    areaId: 3,
    stateId: PROJECT_STATE.NEW,
  },
]
