import { TreeProps } from 'react-organizational-chart'
import { Theme, SxProps } from '@mui/material/styles'
import { TAreaTree } from 'src/contexts/area-tree-context/types'

// ----------------------------------------------------------------------

export type ListProps = {
  data: TAreaTree
  depth: number
  sx?: SxProps<Theme>
}

export type SubListProps = {
  data: TAreaTree[]
  depth: number
  sx?: SxProps<Theme>
}

export type ChartProps = Partial<TreeProps> & {
  sx?: SxProps<Theme>
}
