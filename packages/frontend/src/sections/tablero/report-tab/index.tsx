import React from 'react'
import { Box, Grid } from '@mui/material'
import { IArea } from '@adp/shared'
import { useQuery } from '@apollo/client'
import { GET_PROJECT_COUNT_BY_STATE, GET_PROJECT_COST_BY_STATE } from 'src/graphql/queries'
import FilterComponent from './filter-component'
import ComponentOne from './component-one'
import ComponentTwo from './component-two'
import ComponentThree from './component-three'
import ComponentFour from './component-four'
import ComponentFive from './component-five'
import ComponentSix from './component-six'



type TProps = {
  areas: IArea[];
};

export default function ReportTab(props: TProps) {
  const { areas } = props;
  const { data: projectCountData } = useQuery(GET_PROJECT_COUNT_BY_STATE, {
    variables: { areas: areas?.map(({ id }) => id) || [] },
  });
  const { data: projectCostData } = useQuery(GET_PROJECT_COST_BY_STATE);

  const newProjects = projectCountData?.GET_PROJECT_COUNT_BY_STATE?.new ?? null;
  const inProgressProjects = projectCountData?.GET_PROJECT_COUNT_BY_STATE?.inProgress ?? null;
  const finishedProjects = projectCountData?.GET_PROJECT_COUNT_BY_STATE?.completed ?? null;
  const canceledProjects = projectCountData?.GET_PROJECT_COUNT_BY_STATE?.cancelled ?? null;
  const totalProjects = projectCountData?.GET_PROJECT_COUNT_BY_STATE?.count ?? null;

  const newProjectsCost = projectCostData?.GET_PROJECT_COST_BY_STATE?.new ?? null;
  const inProgressProjectsCost = projectCostData?.GET_PROJECT_COST_BY_STATE?.inProgress ?? null;
  const finishedProjectsCost = projectCostData?.GET_PROJECT_COST_BY_STATE?.completed ?? null;
  const canceledProjectsCost = projectCostData?.GET_PROJECT_COST_BY_STATE?.cancelled ?? null;
  const totalProjectsCost = projectCostData?.GET_PROJECT_COST_BY_STATE?.count ?? null;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <FilterComponent areas={[]} />
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
