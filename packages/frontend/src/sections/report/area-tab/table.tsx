import React, { useEffect } from 'react'
import type { IArea } from '@adp/shared'
import NextLink from 'next/link'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { AREAS_FOR_LIST } from 'src/graphql/queries'
import { Box, IconButton, Link } from '@mui/material'
import { paths } from 'src/routes/paths'
import Iconify from 'src/components/iconify'

type TRow = Pick<
  IArea,
  | 'id'
  | 'name'

>

const columns: TColumn[] = [
  {
    id: 'name',
    label: 'Nombre de area',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => row.name,
    searchValue: (row: TRow) => row.name,
  },

]

const Table = () => {
  const { data, loading, refetch } = useQuery(AREAS_FOR_LIST)
  const { hideColumns, selected, setMultiple } = useTable()

  useEffect(() => {
    hideColumns(columns)
  }, [hideColumns])

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
          <CustomTableToolbar
            id="area-list-table"
            columns={columns}
            download
            refetch={refetch}
          />
          <CustomTableSearch />
          {/* {data && data !== ( */}
          <CustomTable
            id="area-list-table"
            columns={columns}
            data={data.areas}
            action={
              <React.Fragment>
                {selected.length === 1 && (
                  <Link
                    component={NextLink}
                    href={paths.dashboard.area.detail.replace(':id', selected[0])}
                  >
                    <IconButton>
                      <Iconify icon="mdi:eye" />
                    </IconButton>
                  </Link>
                )}
              </React.Fragment>
            }
          />
          {/* )} */}
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
