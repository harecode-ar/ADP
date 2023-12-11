import React, { useEffect } from 'react'
import type { IProject } from '@adp/shared'
import NextLink from 'next/link'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import { useBoolean } from 'src/hooks/use-boolean'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { PROJECTS_FOR_LIST } from 'src/graphql/queries'
import { Box, IconButton, Link } from '@mui/material'
import Label from 'src/components/label'
import { paths } from 'src/routes/paths'
import Iconify from 'src/components/iconify'

const getLabelColor = (id: number) => {
  switch (id) {
    case 1:
      return 'secondary'
    case 2:
      return 'warning'
    case 3:
      return 'success'
    case 4:
      return 'error'
    default:
      return 'warning'
  }
}

type TRow = Pick<
  IProject,
  | 'id'
  | 'name'
  | 'description'
  | 'cost'
  | 'startDate'
  | 'endDate'
  | 'progress'
  | 'stateId'
  | 'areaId'
  | 'createdAt'
  | 'updatedAt'
  | 'state'
  | 'area'
  | 'stages'
  | 'responsible'
>

const columns: TColumn[] = [

  {
    id: 'state',
    label: 'Estado',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: any) => {
      const result = row.state?.name
      return (
        <Label variant="soft" sx={{ ml: 1 }} color={getLabelColor(row.state.id)}>
          {result}
        </Label>
      )
    },
    searchValue: (row: any) => row.state?.name || 'No tiene',
  },
  {
    id: 'progress',
    label: 'Cantidad de proyectos',
    type: EColumnType.NUMBER,
    searchable: true,
    renderCell: (row: any) => `${row.progress * 100}%`,
    searchValue: (row: TRow) => row.progress * 100,
  },
]

const Table = () => {
  const { data, loading, refetch } = useQuery(PROJECTS_FOR_LIST)
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
            id="project-list-table"
            columns={columns}
            download
            refetch={refetch}
          />
          <CustomTableSearch />
          <CustomTable
            id="project-list-table"
            columns={columns}
            data={data.projects}
            action={
              <React.Fragment>
                {selected.length === 1 && (
                  <Link
                    component={NextLink}
                    href={paths.dashboard.project.detail.replace(':id', selected[0])}
                  >
                    <IconButton>
                      <Iconify icon="mdi:eye" />
                    </IconButton>
                  </Link>
                )}
              </React.Fragment>
            }
          />
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
