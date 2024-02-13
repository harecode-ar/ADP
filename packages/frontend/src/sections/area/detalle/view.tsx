'use client'

import type { IArea } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Box, Container, Card, Grid, TextField, Tab, Tabs, Typography, Button } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { AreaTreeProvider } from 'src/contexts/area-tree-context'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { usePrint } from 'src/hooks/use-print'
import { GET_AREA, GET_COUNT_PROJECTS_BY_AREA } from 'src/graphql/queries'
import { useBoolean } from 'src/hooks/use-boolean'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import Iconify from 'src/components/iconify/iconify'
import { DashboardReportProvider } from 'src/contexts/dashboard-report-context'
import GanttTab from './gantt-tab'
import ProjectTab from './project-tab'
import ReportTab from './stadistic-tab'
import ChartTab from './chart-tab'
import ModalEdit from './edit-area-modal'

enum ETab {
  PROJECTS = 'Proyectos',
  STATISTICS = 'Estadisticas',
  GANTT = 'Gantt',
  CHART = 'Organigrama',
}

type TProps = {
  areaId: string
}

export default function AreaDetailView(props: TProps) {
  const { areaId } = props
  const [ref] = usePrint()
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [tab, setTab] = useState<ETab>(ETab.PROJECTS)
  const editAreaModal = useBoolean()

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

  const area: IArea | null = useMemo(() => {
    if (!areaQuery.data) return null
    return areaQuery.data.area
  }, [areaQuery.data])

  const countProjectsByAreaQuery = useQuery(GET_COUNT_PROJECTS_BY_AREA, {
    variables: { areaId: Number(areaId) },
    skip: !areaId,
  })

  const countProjectsByArea: number = useMemo(() => {
    if (!countProjectsByAreaQuery.data) return 0
    return countProjectsByAreaQuery.data.countProjectsByArea || 0
  }, [countProjectsByAreaQuery.data])

  const hasProjects = countProjectsByArea > 0

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
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
          action={
            <Button variant="contained" onClick={editAreaModal.onTrue}>
              <Iconify icon="material-symbols:edit" mr={1} />
              Editar
            </Button>
          }
        />

        {areaQuery.loading && <p>Cargando...</p>}

        {!!area && (
          <React.Fragment>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={area.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Responsable"
                    value={area.responsible ? area.responsible.fullname : 'No tiene'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Area padre"
                    value={area.parent?.name || 'No tiene'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
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
                <Tabs value={tab} indicatorColor="primary" onChange={(_, v) => setTab(v)}>
                  <Tab label={ETab.PROJECTS} value={ETab.PROJECTS} />
                  <Tab label={ETab.STATISTICS} value={ETab.STATISTICS} />
                  <Tab label={ETab.GANTT} value={ETab.GANTT} />
                  <Tab label={ETab.CHART} value={ETab.CHART} sx={{ pl: 1 }} />
                </Tabs>
              </Box>
            </Card>

            {[ETab.PROJECTS, ETab.GANTT].includes(tab) && !hasProjects && (
              <Typography
                sx={{
                  textAlign: 'center',
                  mt: 2,
                  mb: 2,
                }}
              >
                No hay proyectos asignados a esta área
              </Typography>
            )}
            {tab === ETab.PROJECTS && hasProjects && <ProjectTab areaId={areaId} responsableId={area.responsible ? area.responsible.id : null} />}
            {tab === ETab.GANTT && hasProjects && <GanttTab areaId={areaId} />}
            {tab === ETab.STATISTICS && (
              <DashboardReportProvider>
                <ReportTab area={area} />
              </DashboardReportProvider>
            )}
            {tab === ETab.CHART && (
              <AreaTreeProvider>
                <ChartTab areaId={areaId} />
              </AreaTreeProvider>
            )}
            {editAreaModal.value && (
              <ModalEdit modal={editAreaModal} refetch={areaQuery.refetch} area={area} />
            )}
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
