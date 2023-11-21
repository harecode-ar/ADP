import type { IStageState } from './stage-state'
import type { IArea } from './area'
import type { IProject } from './project'
import { IUser } from './user'
import { IStageNote } from './stage-note'

export interface IStage {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  progress: number
  stateId: number
  areaId: number | null
  projectId: number
  parentStageId: number | null

  createdAt: string
  updatedAt: string

  state: IStageState
  area: IArea | null
  responsible: IUser | null
  project: IProject
  parentStage: IStage | null
  childStages: IStage[]
  notes: IStageNote[]
}
