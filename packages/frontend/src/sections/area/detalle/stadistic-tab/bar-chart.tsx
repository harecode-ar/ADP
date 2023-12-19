import { IArea } from '@adp/shared'
import React from 'react'
import Chart, { useChart } from 'src/components/chart'

type TProps = {
  areas: IArea[]
}

export default function BarChart(props: TProps) {
  const { areas } = props

  const colors = areas.map((area) => area.color)

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },
    xaxis: {
      categories: areas.map((area) => area.name),
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
    plotOptions: {
      bar: { horizontal: true },
    },
    colors,
  })

  return (
    <Chart
          dir="ltr"
          type="bar"
          series={areas.map((area, index) => ({
            name: area.name,
            data: [
              ...Array.from({ length: index }, () => 0),
              area.projects?.length || 0,
              ...Array.from({ length: areas.length - index - 1 }, () => 0),
            ],
          }))}
          options={chartOptions}
          width="100%"
          height={400}
        />
  )
}
