import React from 'react'
import { IArea } from '@adp/shared'
import Chart, { useChart } from 'src/components/chart'
import { Box, Card, CardContent } from '@mui/material'
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
      show: false,
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
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          
          justifyContent: 'center',
        }}
      >
        <Chart
          dir="ltr"
          type="pie"
          series={areas.map((area) => area.projects?.length || 0)}
          options={chartOptions}
          width={400}
          height="auto"
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(4, 1fr)`,
            columnGap: 2,
            rowGap: 1,
            mt: 2,
          }}
        >
          {areas.map((area) => (
            <Box key={area.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, whiteSpace: 'nowrap'}}>
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  mr: 1,
                  backgroundColor: area.color,
                }}
              />
              <Box sx={{ fontSize: 13 }}>{area.name}</Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
