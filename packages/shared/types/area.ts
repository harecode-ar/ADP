import { IUser } from "./user"

export interface IArea {
  id: number
  name: string
  rolename: string
  description: string
  multiple: boolean
  parentId: number
  responsibleId: number

  createdAt: string
  updatedAt: string
  deletedAt?: string | null

  parent?: IArea
  children?: IArea[]
  responsible?: IUser
  staff: IUser[]
}