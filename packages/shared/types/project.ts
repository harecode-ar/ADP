import type { IProjectState } from './project-state'
import type { IArea } from './area'
import type { IStage } from './stage'
import { IUser } from './user'
import { IProjectNote } from './project-note'
import { IContact } from './contact'

export interface IProject {
  id: number
  name: string
  description: string
  cost: number
  startDate: string
  endDate: string
  finishedAt: string | null
  progress: number
  stateId: number
  areaId: number | null
  acp: number | null
  pacp: number | null

  createdAt: string
  updatedAt: string

  state: IProjectState
  area: IArea | null
  stages: IStage[]
  responsible: IUser | null
  notes: IProjectNote[]
  contacts?: IContact[]
}
