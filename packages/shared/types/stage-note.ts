import { IUser } from './user'

export interface IStageNote {
  id: number
  message: string
  stageId: number
  userId: number

  createdAt: string
  updatedAt: string

  user?: IUser
}
