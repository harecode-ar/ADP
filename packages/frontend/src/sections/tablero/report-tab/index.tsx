import React from 'react'
import { Box } from '@mui/material'
import { TableContextProvider } from 'src/components/table/context'
import FilterComponent from './filter-component'
import ComponentOne from './component-one'
import { PROJECT_COUNT_BY_STATE } from '../../../mocks/report'
import ComponentTree from './component-tree'

export default function ReportTab() {
  const newProjects = PROJECT_COUNT_BY_STATE.new
  const inProgressProjects = PROJECT_COUNT_BY_STATE.inProgress
  const finishedProjects = PROJECT_COUNT_BY_STATE.completed
  const canceledProjects = PROJECT_COUNT_BY_STATE.cancelled
  const totalProjects = PROJECT_COUNT_BY_STATE.count

  return (
  <React.Fragment>
    <Box>
      <FilterComponent areas={[]} />
      <ComponentOne
        newProjects={newProjects}
        inProgressProjects={inProgressProjects}
        finishedProjects={finishedProjects}
        canceledProjects={canceledProjects}
        totalProjects={totalProjects}
      />
    </Box>
      <TableContextProvider>
        <ComponentTree
         newProjects={newProjects}
         inProgressProjects={inProgressProjects}
         finishedProjects={finishedProjects}
         canceledProjects={canceledProjects}
         totalProjects={totalProjects}/>
      </TableContextProvider>
      </React.Fragment>
  )
}
