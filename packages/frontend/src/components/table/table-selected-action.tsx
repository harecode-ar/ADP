// @mui
import { Checkbox, Typography, Stack, StackProps } from '@mui/material'

// ----------------------------------------------------------------------

interface Props extends StackProps {
  dense?: boolean
  action?: React.ReactNode
  rowCount: number
  numSelected: number
  onSelectAllRows: (checked: boolean) => void
}

export default function TableSelectedAction({
  height,
  action,
  rowCount,
  numSelected,
  onSelectAllRows,
  sx,
  ...other
}: Props) {
  if (!numSelected) {
    return null
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pl: 1,
        pr: 2,
        top: 0,
        left: 0,
        width: 1,
        zIndex: 9,
        height,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        ...sx,
      }}
      {...other}
    >
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSelectAllRows(event.target.checked)
        }
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
          // ...(dense && {
          //   ml: 3,
          // }),
        }}
      >
        {numSelected} {numSelected > 1 ? 'seleccionados' : 'seleccionado'}
      </Typography>

      {action && action}
    </Stack>
  )
}
