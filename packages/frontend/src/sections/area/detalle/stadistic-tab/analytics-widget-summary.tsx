import Stack from '@mui/material/Stack'
import { CardProps } from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import { bgGradient } from 'src/theme/css'
import { ColorSchema } from 'src/theme/palette'

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string
  total: number
  color?: ColorSchema
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme()

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        py: 5,
        borderRadius: 2,
        textAlign: 'center',
        color: 'white',
        backgroundColor: `${color}.main`,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
    </Stack>
  )
}
