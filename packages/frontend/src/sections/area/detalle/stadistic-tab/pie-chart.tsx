import React from 'react'
import { IArea } from '@adp/shared'
import Chart, { useChart } from 'src/components/chart'
import { Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ----------------------------------------------------------------------

type TProps = {
  areas: IArea[]
}

export default function PieChart(props: TProps) {
  const { areas } = props
  const theme = useTheme()
  const chartOptions = useChart({
    labels: areas.map((area) => area.name),
    colors: areas.map((area) => area.color),
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: true,
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      colors: [theme.palette.background.paper],
    },
  })

  return (
    <Chart
          dir="ltr"
          type="pie"
          series={areas.map((area) => area.projects?.length || 0)}
          options={chartOptions}
          width="100%"
          height={400}
        />
  )
}
