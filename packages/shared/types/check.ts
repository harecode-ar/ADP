import type { IChecklist } from './checklist'

export interface ICheck {
  id: number
  title: string
  checked: boolean
  checklistId: number

  createdAt: String
  updatedAt: String

  checklist: IChecklist
}
