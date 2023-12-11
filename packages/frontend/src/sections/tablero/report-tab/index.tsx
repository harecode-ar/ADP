import React from 'react'
import { Box } from '@mui/material'
import FilterComponent from './filter-component'
import ComponentOne from './component-one'
import { PROJECT_COUNT_BY_STATE } from '../../../mocks/report'
import ComponentTwo from './component-two'

export default function ReportTab() {
  const newProjects = PROJECT_COUNT_BY_STATE.new
  const inProgressProjects = PROJECT_COUNT_BY_STATE.inProgress
  const finishedProjects = PROJECT_COUNT_BY_STATE.completed
  const canceledProjects = PROJECT_COUNT_BY_STATE.cancelled
  const totalProjects = PROJECT_COUNT_BY_STATE.count

  return (
    <Box>
      <FilterComponent areas={[]} />
      <ComponentOne
        newProjects={newProjects}
        inProgressProjects={inProgressProjects}
        finishedProjects={finishedProjects}
        canceledProjects={canceledProjects}
        totalProjects={totalProjects}
      />
      <ComponentTwo
        newProjects={newProjects}
        inProgressProjects={inProgressProjects}
        finishedProjects={finishedProjects}
        canceledProjects={canceledProjects}
      />
    </Box>
  )
}
