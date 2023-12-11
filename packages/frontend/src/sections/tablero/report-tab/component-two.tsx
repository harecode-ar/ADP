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

type TSerie = {
  name: string
  data: number[]
}

type CMProps = {
  series: TSerie[]
  categories: string[]
}

function ChartColumnMultiple({ series, categories }: CMProps) {
  const theme = useTheme()

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
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
    <Chart dir="ltr" type="bar" series={series} options={chartOptions} width="100%" height={320} />
  )
}

export default function ComponentTwo(props: TProps) {
  const { newProjects, inProgressProjects, finishedProjects, canceledProjects } = props

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
          <ChartColumnMultiple
            series={[
              { name: 'Nuevos', data: [newProjects, 0, 0, 0] },
              { name: 'En proceso', data: [0, inProgressProjects, 0, 0] },
              { name: 'Finalizados', data: [0, 0, finishedProjects, 0] },
              { name: 'Cancelados', data: [0, 0, 0, canceledProjects] },
            ]}
            categories={['Nuevos', 'En proceso', 'Finalizados', 'Cancelados']}
          />
        </Box>
      </Card>
    </Card>
  )
}
