import type { IProject } from '@adp/shared'
import React, { useEffect } from 'react'
import NextLink from 'next/link'
import CustomTable from 'src/components/table/custom-table'
import CustomTableSearch from 'src/components/table/custom-table-search'
import CustomTableToolbar from 'src/components/table/custom-table-toolbar'
import CustomTableSkeleton from 'src/components/table/custom-table-skeleton'
import { useTable } from 'src/components/table'
import { Box, Card, Typography, Link, Button, IconButton } from '@mui/material'
import { paths } from 'src/routes/paths'
import Iconify from 'src/components/iconify'
import { columns } from './config'

type TProps = {
  loading?: boolean
  refetch?: () => void
  projects: IProject[]
}

const Table = (props: TProps) => {
  const { loading = false, refetch, projects } = props
  const { hideColumns, selected, setMultiple } = useTable()

  useEffect(() => {
    hideColumns(columns)
  }, [hideColumns])

  useEffect(() => {
    setMultiple(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card sx={{ p: 2 }}>
      {loading && <CustomTableSkeleton columns={columns.length} search />}
      {!loading && projects.length > 0 && (
        <React.Fragment>
          <CustomTableToolbar
            id="area-projects-list-table"
            columns={columns}
            download
            refetch={refetch}
          />
          <CustomTableSearch />
          <CustomTable
            id="area-projects-list-table"
            columns={columns}
            data={projects}
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
      {!loading && projects.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            gap: 2,
          }}
        >
          <Typography variant="body1" color="textSecondary">
            No hay proyectos registrados en esta área
          </Typography>
          <Button variant="contained" color="primary">
            <Link
              component={NextLink}
              href={paths.dashboard.project.new}
              underline="none"
              color="inherit"
            >
              Crear proyecto
            </Link>
          </Button>
        </Box>
      )}
    </Card>
  )
}

export default Table
