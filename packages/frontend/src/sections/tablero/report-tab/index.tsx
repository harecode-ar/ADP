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

  const selectedAreasIds = useMemo(() => {
    if (selectedAreas.find((area) => area.id === 0)) return areas.map((area) => area.id)
    return selectedAreas.map((area) => area.id)
  }, [areas, selectedAreas])

  const { data: projectCountData } = useQuery(GET_PROJECT_COUNT_BY_STATE, {
    variables: { areas: selectedAreasIds, startDate, endDate },
  })

  const { data: projectCostData } = useQuery(GET_PROJECT_COST_BY_STATE, {
    variables: { areas: selectedAreasIds, startDate, endDate },
  })

  const {
    new: newCount,
    inProgress: inProgressCount,
    completed: completedCount,
    cancelled: cancelledCount,
  } = useMemo(() => {
    if (!projectCountData) return DEFAULT_VALUE
    return projectCountData.projectCountByState || DEFAULT_VALUE
  }, [projectCountData])

  const totalProjects = newCount + inProgressCount + completedCount + cancelledCount

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
        news={newCount}
        inProgress={inProgressCount}
        completed={completedCount}
        cancelled={cancelledCount}
        total={totalProjects}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ComponentThree
            news={newCount}
            inProgress={inProgressCount}
            completed={completedCount}
            cancelled={cancelledCount}
            total={totalProjects}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentTwo
            news={newCount}
            inProgress={inProgressCount}
            completed={completedCount}
            cancelled={cancelledCount}
          />
        </Grid>
      </Grid>
      <ComponentSix
        news={newCost}
        inProgress={inProgressCost}
        completed={completedCost}
        cancelled={cancelledCost}
        total={totalCost}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ComponentFive
            news={newCost}
            inProgress={inProgressCost}
            completed={completedCost}
            cancelled={cancelledCost}
            total={totalCost}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentFour
            news={newCost}
            inProgress={inProgressCost}
            completed={completedCost}
            cancelled={cancelledCost}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
