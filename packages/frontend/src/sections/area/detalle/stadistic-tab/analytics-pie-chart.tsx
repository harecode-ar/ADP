import { IProjectAreaReport } from '@adp/shared'
import { ApexOptions } from 'apexcharts'
import CardHeader from '@mui/material/CardHeader'
import Card, { CardProps } from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Chart from 'src/components/chart'

// ----------------------------------------------------------------------

const CHART_HEIGHT = 350

const LEGEND_HEIGHT = 300

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    right: `100px !important`,
  },
  '& .apexcharts-legend-text': {
    color: `${theme.palette.text.primary} !important`,
    fontSize: `${theme.typography.body2.fontSize} !important`,
  },
}))

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string
  subheader?: string
  chart: IProjectAreaReport
}

export default function AnalyticsPieChart({ title, subheader, chart, ...other }: Props) {
  const { new: newProject, inProgress, completed, cancelled } = chart

  const options = {
    values: [newProject, inProgress, completed, cancelled],
    labels: ['Nuevo', 'En proceso', 'Completado', 'Cancelado'],
    colors: ['#08bddb', '#fcaa30', '#25c75f', '#ff5832'],
  }

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      <StyledChart
        dir="ltr"
        type="pie"
        series={options.values}
        options={options}
        width="100%"
        height={320}
      />
    </Card>
  )
}
