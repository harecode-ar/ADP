import { IPermission } from './permission'

export interface IRole {
  id: number
  name: string

  permissions?: IPermission[]
}
