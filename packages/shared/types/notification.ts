import type { IUser } from './user'

export enum ENotificationCategory {
  PROJECT = 'Proyecto',
  STAGE = 'Etapa',
  SUB_STAGE = 'Sub Etapa',
  AREA = 'Area',
}

export interface INotification {
  id: number
  title: string
  category: ENotificationCategory

  createdAt: string
  updatedAt: string

  read?: boolean
}

export interface IUserNotification {
  id: number
  read: boolean
  userId: number
  notificationId: number

  createdAt: string
  updatedAt: string

  notification?: INotification
  user?: IUser
}
