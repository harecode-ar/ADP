// @mui
import { Theme } from '@mui/material/styles'
import { Box, SxProps, TablePagination, TablePaginationProps } from '@mui/material'
//

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>
}

export default function TablePaginationCustom({
  rowsPerPageOptions = [5, 10, 15, 25, 50, 100],
  sx,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        labelRowsPerPage="Registros por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
    </Box>
  )
}
