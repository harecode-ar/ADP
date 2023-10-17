import type { IRole } from './role'

export interface IUser {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  roleId: number

  role?: IRole
  fullname?: string

  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
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
