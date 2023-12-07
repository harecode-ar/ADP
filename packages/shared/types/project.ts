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
  cost: string
  startDate: string
  endDate: string
  progress: number
  stateId: number
  areaId: number | null

  createdAt: string
  updatedAt: string

  state: IProjectState
  area: IArea | null
  stages: IStage[]
  responsible: IUser | null
  notes: IProjectNote[]
  contacts?: IContact[]
}
