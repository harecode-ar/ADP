import type { IAreaAverageCompletition } from './average-completition'
import type { IProject } from './project'
import type { IUser } from './user'

export interface IArea {
  id: number
  name: string
  rolename: string
  color: string
  description: string
  multiple: boolean
  parentId: number | null
  responsibleId: number | null

  createdAt: string
  updatedAt: string
  deletedAt?: string | null

  parent?: IArea
  children?: IArea[]
  responsible?: IUser
  staff?: IUser[]
  projects?: IProject[]
  averageCompletition?: IAreaAverageCompletition
}
