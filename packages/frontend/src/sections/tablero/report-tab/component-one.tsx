import React from 'react'
import { Card, Stack, Divider, Typography, Box, CircularProgress } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import { alpha, useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

type InvoiceAnalyticProps = {
  amount: number
  subtitle: string
  percent: number
  color?: string
}

function InvoiceAnalytic(props: InvoiceAnalyticProps) {
  const { amount, subtitle, color, percent } = props
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

type TProps = {
  newProjects: number
  inProgressProjects: number
  finishedProjects: number
  canceledProjects: number
  totalProjects: number
}

export default function ComponentOne(props: TProps) {
  const { newProjects, inProgressProjects, finishedProjects, canceledProjects, totalProjects } =
    props
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
            amount={newProjects}
            subtitle="Nuevos"
            percent={(newProjects / totalProjects || 1) * 100}
            color={theme.palette.info.main}
          />

          <InvoiceAnalytic
            amount={inProgressProjects}
            subtitle="En proceso"
            percent={(inProgressProjects / totalProjects || 1) * 100}
            color={theme.palette.warning.main}
          />

          <InvoiceAnalytic
            amount={finishedProjects}
            subtitle="Finalizados"
            percent={(finishedProjects / totalProjects || 1) * 100}
            color={theme.palette.success.main}
          />

          <InvoiceAnalytic
            amount={canceledProjects}
            subtitle="Cancelados"
            percent={(canceledProjects / totalProjects || 1) * 100}
            color={theme.palette.text.secondary}
          />

          <Stack
            spacing={2.5}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: 1, minWidth: 200 }}
          >
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">{totalProjects}</Typography>
              <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
                Totales
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Scrollbar>
    </Card>
  )
}
