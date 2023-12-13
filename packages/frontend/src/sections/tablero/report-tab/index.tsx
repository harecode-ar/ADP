import { IArea } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import {
  GET_PROJECT_COUNT_BY_STATE,
  GET_PROJECT_COST_BY_STATE,
  GET_USER_AREAS_FOR_SELECT,
} from 'src/graphql/queries'
import { useDashboardReportContext } from 'src/contexts/dashboard-report-context'
import { getLastDayOfMonth } from 'src/utils/format-time'
import FilterComponent from './filter-component'
import ComponentOne from './component-one'
import ComponentTwo from './component-two'
import ComponentThree from './component-three'
import ComponentFour from './component-four'
import ComponentFive from './component-five'
import ComponentSix from './component-six'

type TArea = Pick<IArea, 'id' | 'name'>
const DEFAULT_VALUE = { new: 0, inProgress: 0, completed: 0, cancelled: 0 }

export default function ReportTab() {
  const { selectedAreas, selectedInitialDate, selectedFinalDate } = useDashboardReportContext()

  const areaQuery = useQuery(GET_USER_AREAS_FOR_SELECT)
  const areas: TArea[] = useMemo(() => {
    if (!areaQuery.data) return []
    return areaQuery.data.userAreasForSelect || []
  }, [areaQuery.data])

  const startDate = useMemo(() => {
    if (!selectedInitialDate) return undefined
    return `${selectedInitialDate}-01`
  }, [selectedInitialDate])

  const endDate = useMemo(() => {
    if (!selectedFinalDate) return undefined
    return getLastDayOfMonth(selectedFinalDate)
  }, [selectedFinalDate])

  const { data: projectCountData } = useQuery(GET_PROJECT_COUNT_BY_STATE, {
    variables: { areas: selectedAreas.map((area) => area.id), startDate, endDate },
  })

  const { data: projectCostData } = useQuery(GET_PROJECT_COST_BY_STATE, {
    variables: { areas: selectedAreas.map((area) => area.id), startDate, endDate },
  })

  const {
    new: newProjects,
    inProgress: inProgressProjects,
    completed: completedProjects,
    cancelled: cancelledProjects,
  } = useMemo(() => {
    if (!projectCountData) return DEFAULT_VALUE
    return projectCountData.projectCountByState || DEFAULT_VALUE
  }, [projectCountData])

  const totalProjects = newProjects + inProgressProjects + completedProjects + cancelledProjects

  const {
    new: newCost,
    inProgress: inProgressCost,
    completed: completedCost,
    cancelled: cancelledCost,
  } = useMemo(() => {
    if (!projectCostData) return DEFAULT_VALUE
    return projectCostData.projectCostByState || DEFAULT_VALUE
  }, [projectCostData])

  const totalCost = newCost + inProgressCost + completedCost + cancelledCost

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <FilterComponent areas={areas} />
      <ComponentOne
        newProjects={newProjects}
        inProgressProjects={inProgressProjects}
        finishedProjects={completedProjects}
        canceledProjects={cancelledProjects}
        totalProjects={totalProjects}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ComponentThree
            newProjects={newProjects}
            inProgressProjects={inProgressProjects}
            finishedProjects={completedProjects}
            canceledProjects={cancelledProjects}
            totalProjects={totalProjects}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentTwo
            newProjects={newProjects}
            inProgressProjects={inProgressProjects}
            finishedProjects={completedProjects}
            canceledProjects={cancelledProjects}
          />
        </Grid>
      </Grid>
      <ComponentSix
        newProjects={newCost}
        inProgressProjects={inProgressCost}
        finishedProjects={completedCost}
        canceledProjects={cancelledCost}
        totalProjects={totalCost}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ComponentFive
            newProjects={newCost}
            inProgressProjects={inProgressCost}
            finishedProjects={completedCost}
            canceledProjects={cancelledCost}
            totalProjects={totalCost}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentFour
            newProjects={newCost}
            inProgressProjects={inProgressCost}
            finishedProjects={completedCost}
            canceledProjects={cancelledCost}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
