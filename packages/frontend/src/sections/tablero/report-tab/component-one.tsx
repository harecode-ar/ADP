import React from 'react'
import { Card, Stack, Divider, Typography, Box } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import { useTheme } from '@mui/material/styles'
import InvoiceAnalytic from './invoice-analytic'

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
    <Card
      sx={{
        mt: 2,
        mb: { xs: 3, md: 5 },
      }}
    >
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
