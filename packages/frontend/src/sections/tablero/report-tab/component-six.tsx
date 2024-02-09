import React from 'react'
import { Card, Stack, Divider, Typography, Box, CircularProgress } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import { alpha, useTheme } from '@mui/material/styles'
import { formatCost } from 'src/utils/format-number'

// ----------------------------------------------------------------------

type InvoiceAnalyticProps = {
  amount: number
  subtitle: string
  percent: number
  color?: string
}

function InvoiceAnalytic(props: InvoiceAnalyticProps) {
  const { amount, subtitle, color, percent } = props
  const formattedAmount = formatCost(amount)
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
        <Typography variant="subtitle1">{formattedAmount}</Typography>
        <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
          {subtitle}
        </Box>
      </Stack>
    </Stack>
  )
}

type TProps = {
  news: number
  onHold: number
  inProgress: number
  completed: number
  cancelled: number
  total: number
}

export default function ComponentSix(props: TProps) {
  const { news, onHold, inProgress, completed, cancelled, total } = props
  const theme = useTheme()

  return (
    <Card>
      <Scrollbar>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ py: 2 }}
        >
          <InvoiceAnalytic
            amount={news}
            subtitle="Nuevos"
            percent={Math.round((news / (total || 1)) * 100)}
            color={theme.palette.info.main}
          />
          <InvoiceAnalytic
            amount={onHold}
            subtitle="En espera"
            percent={Math.round((onHold / (total || 1)) * 100)}
            color={theme.palette.warning.main}
          />

          <InvoiceAnalytic
            amount={inProgress}
            subtitle="En proceso"
            percent={Math.round((inProgress / (total || 1)) * 100)}
            color={theme.palette.warning.main}
          />

          <InvoiceAnalytic
            amount={completed}
            subtitle="Finalizados"
            percent={Math.round((completed / (total || 1)) * 100)}
            color={theme.palette.success.main}
          />

          <InvoiceAnalytic
            amount={cancelled}
            subtitle="Cancelados"
            percent={Math.round((cancelled / (total || 1)) * 100)}
            color={theme.palette.text.secondary}
          />
        </Stack>
      </Scrollbar>
    </Card>
  )
}
