import { ViewMode } from 'gantt-task-react'
import type { TViewOption } from './types'

export const VIEW_OPTIONS: TViewOption[] = [
  { label: 'Día', value: ViewMode.Day },
  { label: 'Semana', value: ViewMode.Week },
  { label: 'Mes', value: ViewMode.Month },
  { label: 'Año', value: ViewMode.Year },
]
