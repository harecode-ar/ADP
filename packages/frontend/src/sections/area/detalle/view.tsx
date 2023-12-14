'use client'

import type { IArea } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Box, Container, Card, Grid, TextField, Tab, Tabs } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { AreaTreeProvider } from 'src/contexts/area-tree-context'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_AREA } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import GanttTab from './gantt-tab'
import ProjectTab from './project-tab'
import StadisticTab from './stadistic-tab'
import ChartTab from './chart-tab'

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
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [tab, setTab] = useState<ETab>(ETab.PROJECTS)

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
                <Tabs value={tab} indicatorColor="primary" onChange={(_, v) => setTab(v)}>
                  <Tab label={ETab.PROJECTS} value={ETab.PROJECTS} />
                  <Tab label={ETab.STATISTICS} value={ETab.STATISTICS} />
                  <Tab label={ETab.GANTT} value={ETab.GANTT} />
                  <Tab label={ETab.CHART} value={ETab.CHART} sx={{ pl: 1 }} />
                </Tabs>
              </Box>
            </Card>

            {tab === ETab.PROJECTS && <ProjectTab areaId={areaId} />}
            {tab === ETab.GANTT && <GanttTab areaId={areaId} />}
            {tab === ETab.STATISTICS && <StadisticTab area={area} />}
            {tab === ETab.CHART && (
              <AreaTreeProvider>
                <ChartTab areaId={areaId} />
            </ AreaTreeProvider>
            )}
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
