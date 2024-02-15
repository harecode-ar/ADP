import React, { useEffect, useMemo } from 'react'
import type { IUser } from '@adp/shared'
import NextLink from 'next/link'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { useTable } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { useConfigurationContext } from 'src/contexts/configuration-context'
import { USERS_FOR_REPORT } from 'src/graphql/queries'
import { Box, IconButton, Link, Typography } from '@mui/material'
import { paths } from 'src/routes/paths'
import Iconify from 'src/components/iconify'
import { getColumns } from './config'

const Table = () => {
  const { data, loading, refetch } = useQuery(USERS_FOR_REPORT)
  const { hideColumns, selected, setMultiple } = useTable()
  const { stagePercentageAlertMargin, projectPercentageAlertMargin } = useConfigurationContext()

  const users: IUser[] = useMemo(() => {
    if (data) {
      return data.usersForReport || []
    }
    return []
  }, [data])

  const columns = useMemo(
    () =>
      getColumns({
        stagePercentageAlertMargin,
        projectPercentageAlertMargin,
      }),
    [stagePercentageAlertMargin, projectPercentageAlertMargin]
  )

  useEffect(() => {
    hideColumns(columns)
  }, [hideColumns, columns])

  useEffect(() => {
    setMultiple(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {loading ? (
        <CustomTableSkeleton columns={columns.length} search />
      ) : (
        <React.Fragment>
          <CustomTableToolbar id="area-list-table" columns={columns} download refetch={refetch} />
          <CustomTableSearch />
          {data ? (
            <CustomTable
              id="user-list-table"
              columns={columns}
              data={users}
              action={
                <React.Fragment>
                  {selected.length === 1 && (
                    <Link
                      component={NextLink}
                      href={paths.dashboard.user.detail.replace(':id', selected[0])}
                    >
                      <IconButton>
                        <Iconify icon="mdi:eye" />
                      </IconButton>
                    </Link>
                  )}
                </React.Fragment>
              }
            />
          ) : (
            <Typography
              sx={{
                textAlign: 'center',
                mt: 2,
                mb: 2,
              }}
            >
              No se encontraron usuarios.
            </Typography>
          )}
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
