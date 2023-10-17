// @mui
import { Theme } from '@mui/material/styles'
import {
  Box,
  SxProps,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material'
import { EOrder } from './types'

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const

// ----------------------------------------------------------------------

type Props = {
  multiple?: boolean
  order?: EOrder
  orderBy?: string
  headLabel: any[]
  rowCount?: number
  numSelected?: number
  onSort?: (id: string) => void
  onSelectAllRows?: (checked: boolean) => void
  sx?: SxProps<Theme>
  checkbox?: boolean
}

export default function TableHeadCustom({
  multiple = true,
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
  checkbox = true,
}: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {checkbox && onSelectAllRows && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSelectAllRows(event.target.checked)
              }
              disabled={!multiple}
            />
          </TableCell>
        )}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : EOrder.ASC}
                onClick={() => onSort(headCell.id)}
                sx={{ textTransform: 'capitalize' }}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === EOrder.DESC ? 'Ordenado descendente' : 'Ordenado ascendente'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
