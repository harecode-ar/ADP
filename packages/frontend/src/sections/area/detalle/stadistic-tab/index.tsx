import { IArea, IProjectCountByState } from '@adp/shared'
import { Grid } from '@mui/material'
import React, { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECT_COUNT_BY_STATE, GET_DIRECT_AREA_DESCENDANTS } from 'src/graphql/queries'
import AnalyticsWidgetSummary from './analytics-widget-summary'
import ProjectsByArea from './projects-by-area'

type TProps = {
  area: IArea
}

export default function StadisticTab(props: TProps) {
  const { area } = props

  const { data } = useQuery(GET_PROJECT_COUNT_BY_STATE, {
    variables: {
      areas: [area.id],
    },
    skip: !area.id,
  })

  const report: IProjectCountByState = useMemo(() => {
    if (!data) return { new: 0, inProgress: 0, completed: 0, cancelled: 0 }
    return data.projectCountByState
  }, [data])

  const descendantQuery = useQuery(GET_DIRECT_AREA_DESCENDANTS, {
    variables: {
      areaId: area.id,
    },
    skip: !area.id,
  })

  const descendantAreas: IArea[] = useMemo(() => {
    if (!descendantQuery.data) return []
    return descendantQuery.data.directAreaDescendants
  }, [descendantQuery.data])

  const filteredDescendantAreas = useMemo(
    () => descendantAreas.filter((a) => a.projects?.length),
    [descendantAreas]
  )

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
          <AnalyticsWidgetSummary title="Nuevo" total={report.new} color="info" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="En proceso" total={report.inProgress} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Completado"
            total={report.completed}
            color="success"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Cancelado"
            total={report.cancelled}
            color="error"
          />
        </Grid>
      </Grid>

      {!!filteredDescendantAreas.length && <ProjectsByArea areas={filteredDescendantAreas} />}
    </React.Fragment>
  )
}
