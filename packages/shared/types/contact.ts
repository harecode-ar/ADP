import type { IStage } from './stage'
import type { IProject } from './project'
import type { IUser } from './user'

export interface IContact {
  id: number
  name: string
  phone: string
  image: string | null

  createdAt: String
  updatedAt: String

  users: IUser[]
  stages: IStage[]
  projects: IProject[]
}
