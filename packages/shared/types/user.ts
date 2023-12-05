import type { IContact } from './contact'
import type { IRole } from './role'

export interface IUser {
  id: number
  firstname: string
  lastname: string
  email: string
  telephone: string | null
  password: string
  image: string | null
  roleId: number

  role?: IRole
  fullname?: string

  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  contacts: IContact[]
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
