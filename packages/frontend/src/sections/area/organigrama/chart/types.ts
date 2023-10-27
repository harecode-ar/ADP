import { TreeProps } from 'react-organizational-chart'
import { Theme, SxProps } from '@mui/material/styles'
import { TAreaTree } from 'src/contexts/area-tree-context/types'

// ----------------------------------------------------------------------

export type ListProps = {
  data: TAreaTree
  depth: number
  sx?: SxProps<Theme>
  onAdd?: (node: TAreaTree) => void
  onEdit?: (node: TAreaTree) => void
  onDelete?: (node: TAreaTree) => void
}

export type SubListProps = {
  data: TAreaTree[]
  depth: number
  sx?: SxProps<Theme>
  onAdd?: (node: TAreaTree) => void
  onEdit?: (node: TAreaTree) => void
  onDelete?: (node: TAreaTree) => void
}

export type ChartProps = Partial<TreeProps> & {
  sx?: SxProps<Theme>
  onAdd?: (node: TAreaTree) => void
  onEdit?: (node: TAreaTree) => void
  onDelete?: (node: TAreaTree) => void
}
