import type { IArea } from './area'
import type { IStage } from './stage'
import type { IUserAverageCompletition } from './average-completition'
import type { IContact } from './contact'
import type { IRole } from './role'
import type { IProject } from './project'

export interface IUser {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string | null
  password: string
  image: string | null
  roleId: number

  role?: IRole
  fullname?: string

  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  contacts?: IContact[]
  averageCompletition?: IUserAverageCompletition
  areas?: IArea[]
  sharedStages?: IStage[]
  sharedSubStages?: IStage[]
  sharedProjects?: IProject[]
}

export type IUserCard = {
  id: string
  name: string
  role: string
  coverUrl: string
  avatarUrl: string
  totalPosts: number
}

export type TChangePasswordInput = {
  oldPassword: string
  newPassword: string
}

export type TResetPasswordInput = {
  token: string
  password: string
}

export type TForgotPasswordInput = {
  email: string
}
