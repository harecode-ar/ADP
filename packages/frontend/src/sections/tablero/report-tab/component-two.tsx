import React from 'react'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Card from '@mui/material/Card'
import Chart, { useChart } from 'src/components/chart'
import { useTheme } from '@mui/material/styles'

type TProps = {
  newProjects: number
  inProgressProjects: number
  finishedProjects: number
  canceledProjects: number
}

export default function ComponentTwo(props: TProps) {
  const { newProjects, inProgressProjects, finishedProjects, canceledProjects } = props

  const theme = useTheme()

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Nuevos', 'En proceso', 'Finalizados', 'Cancelados'],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
    plotOptions: {
      bar: { barHeight: '100%', columnWidth: '36%', horizontal: true },
    },
    colors: [
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.text.secondary,
    ],
  })

  return (
    <Card
      sx={{
        mt: 2,
        mb: { xs: 3, md: 5 },
      }}
    >
      <Card>
        <CardHeader title="Proyectos generales" />
        <Box sx={{ mx: 3 }}>
          <Chart
            dir="ltr"
            type="bar"
            series={[
              { name: 'Nuevos', data: [newProjects, 0, 0, 0] },
              { name: 'En proceso', data: [0, inProgressProjects, 0, 0] },
              { name: 'Finalizados', data: [0, 0, finishedProjects, 0] },
              { name: 'Cancelados', data: [0, 0, 0, canceledProjects] },
            ]}
            options={chartOptions}
            width="100%"
            height={320}
          />
        </Box>
      </Card>
    </Card>
  )
}
