import { BoxProps } from '@mui/material/Box'

// ----------------------------------------------------------------------

export type LabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'statisticsNew'
  | 'statisticsOnHold'
  | 'statisticsInProgress'
  | 'statisticsCompleted'
  | 'statisticsCancelled'
  | 'statisticsTotal'

export type LabelVariant = 'filled' | 'outlined' | 'soft'

export interface LabelProps extends BoxProps {
  startIcon?: React.ReactElement | null
  endIcon?: React.ReactElement | null
  color?: LabelColor
  variant?: LabelVariant
}
