import type { TMimeType } from './file'
import type { IUser } from './user'

export interface IFileRecord {
  id: number
  originalName: string
  fileName: string
  mimeType: TMimeType
  size: number
  userId: number

  user?: IUser

  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
