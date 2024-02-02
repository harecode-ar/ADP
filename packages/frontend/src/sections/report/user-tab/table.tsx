import React, { useEffect, useMemo } from 'react'
import type { IUser } from '@adp/shared'
import NextLink from 'next/link'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { EColumnType, useTable } from 'src/components/table'
import type { TColumn } from 'src/components/table'
import { useQuery } from '@apollo/client'
import { USERS_FOR_REPORT } from 'src/graphql/queries'
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { paths } from 'src/routes/paths'
import Iconify from 'src/components/iconify'
import {
  getColorFromAcp,
  getColorFromPacp,
  getTooltipFromAcp,
  getTooltipFromPacp,
} from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'

type TRow = Pick<IUser, 'id' | 'firstname' | 'lastname' | 'averageCompletition'>

const columns: TColumn[] = [
  {
    id: 'fullname',
    label: 'Nombre Completo',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => `${row.firstname} ${row.lastname}`,
    searchValue: (row: TRow) => `${row.firstname} ${row.lastname}`,
  },
  {
    id: 'projectAcp',
    label: 'Proyecto ACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromAcp(row.averageCompletition?.projectAcp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromAcp(
                row.averageCompletition?.projectAcp || null,
                DEFAULT_PERCENTAGE_ALERT_MARGIN
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.projectAcp !== null
            ? row.averageCompletition?.projectAcp.toFixed(2)
            : '-'}
        </Typography>
      </Box>
    ),
    // renderCell: (row: TRow) => (row.averageCompletition?.projectAcp ?? '-'),
    searchValue: (row: TRow) => row.averageCompletition?.projectAcp ?? '-',
  },
  {
    id: 'projectPacp',
    label: 'Proyecto PACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromPacp(row.averageCompletition?.projectPacp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromPacp(
                row.averageCompletition?.projectPacp || null,
                DEFAULT_PERCENTAGE_ALERT_MARGIN
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.projectPacp !== null
            ? row.averageCompletition?.projectPacp.toFixed(2)
            : '-'}
        </Typography>
      </Box>
    ),
    searchValue: (row: TRow) => row.averageCompletition?.projectPacp ?? '-',
  },
  {
    id: 'stageAcp',
    label: 'etapa ACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromAcp(row.averageCompletition?.stageAcp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromAcp(
                row.averageCompletition?.stageAcp || null,
                DEFAULT_PERCENTAGE_ALERT_MARGIN
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.stageAcp !== null
            ? row.averageCompletition?.stageAcp.toFixed(2)
            : '-'}
        </Typography>
      </Box>
    ),
    searchValue: (row: TRow) => row.averageCompletition?.stageAcp ?? '-',
  },
  {
    id: 'stagePacp',
    label: 'etapa PACP',
    type: EColumnType.STRING,
    searchable: true,
    renderCell: (row: TRow) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={getTooltipFromPacp(row.averageCompletition?.stagePacp || null, 0)}>
          <Box
            sx={{
              backgroundColor: getColorFromPacp(
                row.averageCompletition?.stagePacp || null,
                DEFAULT_PERCENTAGE_ALERT_MARGIN
              ),
              width: 15,
              height: 15,
              borderRadius: '50%',
              marginRight: 2,
            }}
          />
        </Tooltip>
        <Typography>
          {row.averageCompletition?.stagePacp !== null
            ? row.averageCompletition?.stagePacp.toFixed(2)
            : '-'}
        </Typography>
      </Box>
    ),
    searchValue: (row: TRow) => row.averageCompletition?.stagePacp ?? '-',
  },
]

const Table = () => {
  const { data, loading, refetch } = useQuery(USERS_FOR_REPORT)
  const { hideColumns, selected, setMultiple } = useTable()

  const users: IUser[] = useMemo(() => {
    if (data) {
      return data.usersForReport || []
    }
    return []
  }, [data])

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
                      href={paths.dashboard.user.list.replace(':id', selected[0])}
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
