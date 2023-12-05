import type { ICheck } from './check'
import type { IProject } from './project'
import type { IStage } from './stage'
import type { IUser } from './user'

export interface IChecklist {
  id: number
  title: string
  userId: number
  stageId: number | null
  projectId: number | null

  createdAt: String
  updatedAt: String

  checks: ICheck[]
  user: IUser
  stage: IStage | null
  project: IProject | null
}
