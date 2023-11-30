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
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Nuevo" total={report.new} color="info" icon="entypo:new" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="En proceso" total={report.inProgress} icon="mdi:tools" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Completado"
            total={report.completed}
            color="success"
            icon="fluent-mdl2:completed-solid"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Cancelado"
            total={report.cancelled}
            color="error"
            icon="ooui:cancel"
          />
        </Grid>
      </Grid>

      {report.new === 0 &&
      report.inProgress === 0 &&
      report.completed === 0 &&
      report.cancelled === 0 ? null : (
        <AnalyticsPieChart title="Proyectos" subheader="Estado de los proyectos" chart={report} />
      )}
    </React.Fragment>
  )
}
