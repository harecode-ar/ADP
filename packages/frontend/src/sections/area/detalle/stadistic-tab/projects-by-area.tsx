import React from 'react'
import { IArea } from '@adp/shared'
import { Box, Card, CardContent, CardHeader, Switch, Typography } from '@mui/material'
import PieChart from './pie-chart'
import BarChart from './bar-chart'

// ----------------------------------------------------------------------

type TProps = {
  areas: IArea[]
}

export default function ProjectsByArea(props: TProps) {
  const { areas } = props
  const [checked, setChecked] = React.useState(false)

  return (
    <Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <CardHeader title="Porcentaje de proyectos por Area" />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>Gráfico de Barras</Typography>
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography>Gráfico de Torta</Typography>
        </Box>
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {checked ? (
          <PieChart areas={areas} />
        ) : (
          <BarChart areas={areas} />
        )}
      </CardContent>
    </Card>
  )
}
