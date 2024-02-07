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
import { Box, IconButton, Link, Typography } from '@mui/material'
import Label from 'src/components/label'
import { paths } from 'src/routes/paths'
import Iconify from 'src/components/iconify'
import getLabelColor from 'src/utils/color-progress'
import ModalEdit from './modal-edit'

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
    id: 'name',
    label: 'Nombre de proyecto',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => row.name,
    searchValue: (row: TRow) => row.name,
  },
  {
    id: 'area',
    label: 'Area',
    type: EColumnType.STRING,
    hidden: true,
    searchable: true,
    renderCell: (row: any) => (row.area ? row.area.name : 'Sin area'),
    searchValue: (row: any) => (row.area ? row.area.name : 'Sin area'),
  },
  {
    id: 'fullName',
    label: 'Responsable',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: any) => (row.responsible ? row.responsible?.fullname : 'Sin responsable'),
    searchValue: (row: any) => (row.responsible ? row.responsible?.fullname : 'Sin responsable'),
  },
  {
    id: 'progress',
    label: 'Avance',
    type: EColumnType.NUMBER,
    searchable: true,
    renderCell: (row: any) => `${(row.progress * 100).toFixed(0)}%`,
    searchValue: (row: TRow) => Number((row.progress * 100).toFixed(0)),
  },
  {
    id: 'state',
    label: 'Estado',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: any) => {
      const result = row.state?.name
      return (
        <Label
          variant="soft"
          sx={{ ml: 1 }}
          color={getLabelColor(row.state?.id || row.state?.name)}
        >
          {result}
        </Label>
      )
    },
    searchValue: (row: any) => row.state?.name || 'No tiene',
  },
]

const Table = () => {
  const { data, loading, refetch } = useQuery(PROJECTS_FOR_LIST)
  const { hideColumns, selected, setMultiple } = useTable()
  const modalEdit = useBoolean()

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
          <CustomTableToolbar id="user-list-table" columns={columns} download refetch={refetch} />
          <CustomTableSearch />
          {data ? (
            <CustomTable
              id="user-list-table"
              columns={columns}
              data={data.users}
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
                  <IconButton onClick={modalEdit.onTrue}>
                    <Iconify icon="material-symbols:edit" />
                  </IconButton>
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
              No hay proyectos para mostrar.
            </Typography>
          )}
          {modalEdit.value && <ModalEdit modal={modalEdit} refetch={refetch} />}
        </React.Fragment>
      )}
    </Box>
  )
}

export default Table
