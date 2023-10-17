import { IUser } from './user'

export interface ISession {
  id: number
  userAgent: string
  userId: number

  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user?: IUser
  token?: string
}

export type TLoginInput = Pick<IUser, 'email' | 'password'>
