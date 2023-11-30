import { IArea, IProjectAreaReport } from '@adp/shared'
import { Grid } from '@mui/material'
import React, { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { PROJECT_AREA_REPORT } from 'src/graphql/queries'
import AnalyticsWidgetSummary from './analytics-widget-summary'
import AnalyticsPieChart from './analytics-pie-chart'

type TProps = {
  area: IArea
}

export default function StadisticTab(props: TProps) {
  const { area } = props
  const { data } = useQuery(PROJECT_AREA_REPORT, {
    variables: {
      areaId: area.id,
    },
    skip: !area.id,
  })

  const report: IProjectAreaReport = useMemo(() => {
    if (!data) return { new: 0, inProgress: 0, completed: 0, cancelled: 0 }
    return data.projectAreaReport
  }, [data])

  console.log(report)

  return (
    <React.Fragment>
    <Grid
      sx={{
        mt: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      container
      spacing={1}
      gap={1}
    >
      <Grid xs={12} sm={6} md={2}>
        <AnalyticsWidgetSummary title="Nuevo" total={report.new} color="info" icon="entypo:new" />
      </Grid>

      <Grid xs={12} sm={6} md={2}>
        <AnalyticsWidgetSummary title="En proceso" total={report.inProgress} icon="mdi:tools" />
      </Grid>

      <Grid xs={12} sm={6} md={2}>
        <AnalyticsWidgetSummary
          title="Completado"
          total={report.completed}
          color="success"
          icon="fluent-mdl2:completed-solid"
        />
      </Grid>

      <Grid xs={12} sm={6} md={2}>
        <AnalyticsWidgetSummary title="Cancelado" total={report.cancelled} color="error" icon="ooui:cancel" />
      </Grid>

    </Grid>

     <AnalyticsPieChart  title="Proyectos" subheader="Estado de los proyectos" chart={report}/>
    </React.Fragment>
  )
}
