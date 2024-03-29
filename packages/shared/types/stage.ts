import type { ITaskState } from './task-state'
import type { IArea } from './area'
import type { IProject } from './project'
import { IUser } from './user'
import { IStageNote } from './stage-note'
import { IContact } from './contact'

export interface IStage {
  id: number
  name: string
  description: string
  startDate: string
  endDate: string
  finishedAt: string | null
  progress: number
  hasStages: boolean
  stateId: number
  areaId: number | null
  projectId: number
  parentStageId: number | null
  acp: number | null
  pacp: number | null

  createdAt: string
  updatedAt: string

  state: ITaskState
  area: IArea | null
  responsible: IUser | null
  project: IProject
  parentStage: IStage | null
  childStages: IStage[]
  notes: IStageNote[]
  contacts?: IContact[]
  viewers?: IUser[]
}
