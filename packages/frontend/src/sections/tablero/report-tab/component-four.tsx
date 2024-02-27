import React from 'react'
import Card from '@mui/material/Card'
import Chart, { useChart } from 'src/components/chart'
import { useTheme } from '@mui/material/styles'
import { formatCost } from 'src/utils/format-number'

type TProps = {
  news: number
  onHold: number
  inProgress: number
  completed: number
  cancelled: number
}

export default function ComponentTwo(props: TProps) {
  const { news, onHold, inProgress, completed, cancelled } = props
  const theme = useTheme()

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Nuevos', 'En espera', 'En proceso', 'Finalizados', 'Cancelados'],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => formatCost(value),
      },
    },
    plotOptions: {
      bar: { horizontal: true },
    },
    colors: [
      theme.palette.statisticsNew.main,
      theme.palette.statisticsOnHold.main,
      theme.palette.statisticsInProgress.main,
      theme.palette.statisticsCompleted.main,
      theme.palette.statisticsCancelled.main,
    ],
  })

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
      <Card
        sx={{
          p: 2,
          pl: 0,
        }}
      >
        <Chart
          dir="ltr"
          type="bar"
          series={[
            { name: 'Nuevos', data: [news, 0, 0, 0, 0] },
            { name: 'En espera', data: [0, onHold, 0, 0, 0] },
            { name: 'En proceso', data: [0, 0, inProgress, 0, 0] },
            { name: 'Finalizados', data: [0, 0, 0, completed, 0] },
            { name: 'Cancelados', data: [0, 0, 0, 0, cancelled] },
          ]}
          options={chartOptions}
          width="100%"
          height={360}
        />
      </Card>
    </Card>
  )
}
