import React from 'react'
import { Box } from '@mui/material'
import { TableContextProvider } from 'src/components/table/context'
import FilterComponent from './filter-component'
import Table from './component-tree'


export default function ReportTab() {
  return (
  <React.Fragment>
    <Box>
      <FilterComponent areas={[]} />
    </Box>
      <TableContextProvider>
        <Table />
      </TableContextProvider>
      </React.Fragment>
  )
}
