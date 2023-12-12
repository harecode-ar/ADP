import { IArea } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_USER_AREAS_FOR_SELECT } from 'src/graphql/queries'
import FilterComponent from './filter-component'
import ComponentOne from './component-one'
import ComponentTwo from './component-two'
import ComponentThree from './component-three'
import ComponentFour from './component-four'
import ComponentFive from './component-five'
import ComponentSix from './component-six'
import { PROJECT_COUNT_BY_STATE, PROJECT_COST_BY_STATE } from '../../../mocks/report'

type TArea = Pick<IArea, 'id' | 'name'>

export default function ReportTab() {

  const areaQuery = useQuery(GET_USER_AREAS_FOR_SELECT)

  const newProjects = PROJECT_COUNT_BY_STATE.new
  const inProgressProjects = PROJECT_COUNT_BY_STATE.inProgress
  const finishedProjects = PROJECT_COUNT_BY_STATE.completed
  const canceledProjects = PROJECT_COUNT_BY_STATE.cancelled
  const totalProjects = PROJECT_COUNT_BY_STATE.count

  const newProjectsCost = PROJECT_COST_BY_STATE.new
  const inProgressProjectsCost = PROJECT_COST_BY_STATE.inProgress
  const finishedProjectsCost = PROJECT_COST_BY_STATE.completed
  const canceledProjectsCost = PROJECT_COST_BY_STATE.cancelled
  const totalProjectsCost = PROJECT_COST_BY_STATE.count

  const areas: TArea[] = useMemo(() => {
    if (!areaQuery.data) return []
    return areaQuery.data.userAreasForSelect || []
  }, [areaQuery.data])

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <FilterComponent areas={areas} />
      <ComponentOne
        newProjects={newProjects}
        inProgressProjects={inProgressProjects}
        finishedProjects={finishedProjects}
        canceledProjects={canceledProjects}
        totalProjects={totalProjects}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ComponentThree
            newProjects={newProjects}
            inProgressProjects={inProgressProjects}
            finishedProjects={finishedProjects}
            canceledProjects={canceledProjects}
            totalProjects={totalProjects}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentTwo
            newProjects={newProjects}
            inProgressProjects={inProgressProjects}
            finishedProjects={finishedProjects}
            canceledProjects={canceledProjects}
          />
        </Grid>
      </Grid>
      <ComponentSix
        newProjects={newProjectsCost}
        inProgressProjects={inProgressProjectsCost}
        finishedProjects={finishedProjectsCost}
        canceledProjects={canceledProjectsCost}
        totalProjects={totalProjectsCost}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ComponentFive
            newProjects={newProjectsCost}
            inProgressProjects={inProgressProjectsCost}
            finishedProjects={finishedProjectsCost}
            canceledProjects={canceledProjectsCost}
            totalProjects={totalProjectsCost}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ComponentFour
            newProjects={newProjectsCost}
            inProgressProjects={inProgressProjectsCost}
            finishedProjects={finishedProjectsCost}
            canceledProjects={canceledProjectsCost}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
