import React, { useEffect } from 'react'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { useTable } from 'src/components/table'
import { useConfigurationContext } from 'src/contexts/configuration-context'
import { useBoolean } from 'src/hooks/use-boolean'
import { Box, IconButton } from '@mui/material'
import Iconify from 'src/components/iconify'
import { COLUMNS, TABLE_ID } from './config'

export default function Table() {
  const { selected, setMultiple } = useTable()

  const { configurations, loading, refetch } = useConfigurationContext()

  const percentageAlertMarginModal = useBoolean()

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setMultiple(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {loading ? (
        <CustomTableSkeleton columns={COLUMNS.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id={TABLE_ID} columns={COLUMNS} download refetch={refetch} />
          <CustomTableSearch />
          <CustomTable
            id={TABLE_ID}
            columns={COLUMNS}
            data={configurations}
            action={
              <React.Fragment>
                {selected.length === 1 && (
                  <IconButton>
                    <Iconify icon="material-symbols:edit" />
                  </IconButton>
                )}
              </React.Fragment>
            }
          />
        </React.Fragment>
      )}
    </Box>
  )
}
