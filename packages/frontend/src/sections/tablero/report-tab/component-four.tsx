import React from 'react'
import Card from '@mui/material/Card'
import Chart, { useChart } from 'src/components/chart'
import { useTheme } from '@mui/material/styles'
import { fCurrency } from 'src/utils/format-number'

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
      width: 0,
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
        formatter: (value: number) => `${fCurrency(value).replace('.', ';').replace(/,/g, '.').replace(';', ',')}`,
      },
    },
    plotOptions: {
      bar: { horizontal: true },
    },
    colors: [
      theme.palette.info.dark,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.text.secondary,
    ],
  })

  return (
    <Card sx={{
      width: '100%',
    }}>
      <Card sx={{
        p: 2,
        pl: 0
      }}>
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
      </Card>
    </Card>
  )
}
