'use client'

import type { IArea, IProject } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box, Container, Card, Grid, TextField, Tab, Tabs } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { TableContextProvider } from 'src/components/table/context'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_AREA, GET_PROJECTS_BY_AREA } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import Table from './table'

type TProps = {
  areaId: string
}

export default function AreaDetailView(props: TProps) {
  const { areaId } = props
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const areaQuery = useQuery(GET_AREA, {
    variables: { id: Number(areaId) },
    skip: !areaId,
    onCompleted: (d) => {
      if (!d.area) {
        enqueueSnackbar('Area no encontrada', { variant: 'error' })
        router.push(paths.dashboard.area.root)
      }
    },
  })

  const projectQuery = useQuery(GET_PROJECTS_BY_AREA, {
    variables: { areaId: Number(areaId) },
    skip: !areaId,
  })

  const area: IArea | null = useMemo(() => {
    if (!areaQuery.data) return null
    return areaQuery.data.area
  }, [areaQuery.data])

  const projects: IProject[] = useMemo(() => {
    if (!projectQuery.data) return []
    return projectQuery.data.projectsByArea
  }, [projectQuery.data])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CustomBreadcrumbs
          heading="Detalle de Area"
          links={[{ name: 'Area', href: paths.dashboard.area.root }, { name: 'Detalle' }]}
        />

        {areaQuery.loading && <p>Cargando...</p>}

        {!!area && (
          <React.Fragment>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={area.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Responsable"
                    value={area.responsible ? area.responsible.fullname : 'No tiene'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    value={area.description}
                    InputProps={{
                      readOnly: true,
                    }}
                    multiline
                    maxRows={10}
                  />
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Tabs value={0} indicatorColor="primary">
                  <Tab label="Proyectos" />
                  <Tab label="Estadistica" disabled />
                </Tabs>
              </Box>
            </Card>
            <TableContextProvider>
              <Table
                loading={projectQuery.loading}
                refetch={projectQuery.refetch}
                projects={projects}
              />
            </TableContextProvider>
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
