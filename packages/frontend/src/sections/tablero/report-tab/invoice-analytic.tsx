import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// ----------------------------------------------------------------------

type Props = {
  amount: number
  subtitle: string
  percent: number
  color?: string
}

export default function InvoiceAnalytic({ amount, subtitle, color, percent }: Props) {
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 200 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Box sx={{ position: 'absolute', fontSize: 12 }}>{percent}%</Box>

        <CircularProgress
          variant="determinate"
          value={percent}
          size={56}
          thickness={2}
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={3}
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.grey[500], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{amount}</Typography>

        <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
          {subtitle}
        </Box>
      </Stack>
    </Stack>
  )
}
