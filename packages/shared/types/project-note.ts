import type { IFileRecord } from './file-record'
import type { IUser } from './user'

export interface IProjectNote {
  id: number
  message: string
  projectId: number
  userId: number

  createdAt: string
  updatedAt: string

  user?: IUser
  files?: IFileRecord[]
}
