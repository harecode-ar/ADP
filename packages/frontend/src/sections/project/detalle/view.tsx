'use client'

import type { IProject, IStage } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Box, Container, Card, Tab, Tabs, Grid, TextField } from '@mui/material'

import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_PROJECT, GET_STAGES_BY_PROJECT } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import DetailTab from './detail-tab'
import StagesTab from './stages-tab'
import GanttTab from './gantt-tab'

enum ETab {
  DETAIL = 'Detalle',
  STAGES = 'Etapas',
  GANTT = 'Gantt',
}

type TProps = {
  projectId: string
}

export default function ProjectDetailView(props: TProps) {
  const { projectId } = props
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [tab, setTab] = useState<ETab>(ETab.STAGES)

  const projectQuery = useQuery(GET_PROJECT, {
    variables: { id: Number(projectId) },
    skip: !projectId,
    onCompleted: (d) => {
      if (!d.project) {
        enqueueSnackbar('Proyecto no encontrado', { variant: 'error' })
        router.push(paths.dashboard.project.root)
      }
    },
  })

  const stageQuery = useQuery(GET_STAGES_BY_PROJECT, {
    variables: { projectId: Number(projectId) },
    skip: !projectId,
    onCompleted: (d) => {
      if (!d.stagesByProject) {
        enqueueSnackbar('Stage no encontrado', { variant: 'error' })
        router.push(paths.dashboard.project.root)
      }
    },
  })

  const project: IProject | null = useMemo(() => {
    if (!projectQuery.data) return null
    return projectQuery.data.project
  }, [projectQuery.data])

  const stages: IStage[] = useMemo(() => {
    if (!stageQuery.data) return []
    return stageQuery.data.stagesByProject
  }, [stageQuery.data])
  const formatDate = (dateString: string) => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

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
          heading="Detalle de Proyecto"
          links={[{ name: 'Proyecto', href: paths.dashboard.project.root }, { name: 'Detalle' }]}
        />

        {projectQuery.loading && <p>Cargando...</p>}

        {!!project && (
          <React.Fragment>
            <Box>
              <Grid container spacing={2}>
                {/* name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    name="name"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={project.name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* status */}
                <Grid item xs={12} md={3}>
                  <TextField
                    id="status"
                    name="status"
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    value={project.state.name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* cost */}
                <Grid item xs={12} md={3}>
                  <TextField
                    id="cost"
                    name="cost"
                    label="Costo"
                    variant="outlined"
                    fullWidth
                    value={project.cost}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* startDate */}
                <Grid item xs={12} md={2}>
                  <TextField
                    id="startDate"
                    name="startDate"
                    label="Fecha de inicio"
                    variant="outlined"
                    fullWidth
                    value={formatDate(project.startDate)}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* endDate */}
                <Grid item xs={12} md={2}>
                  <TextField
                    id="endDate"
                    name="endDate"
                    label="Fecha de finalizacion"
                    variant="outlined"
                    fullWidth
                    value={formatDate(project.startDate)}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* progress */}
                <Grid item xs={12} md={2}>
                  <TextField
                    id="progress"
                    name="progress"
                    label="Progreso"
                    variant="outlined"
                    fullWidth
                    value={`${project.progress * 100}%`}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* area */}
                <Grid item xs={12} md={3}>
                  <TextField
                    id="area"
                    name="area"
                    label="Area"
                    variant="outlined"
                    fullWidth
                    value={project.area ? project.area.name : 'Sin area'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* responsible */}
                <Grid item xs={12} md={3}>
                  <TextField
                    id="responsible"
                    name="responsible"
                    label="Responsable"
                    variant="outlined"
                    fullWidth
                    value={project.responsible ? project.responsible.fullname : 'Sin responsable'}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* description */}
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={project.description}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Card sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label={ETab.DETAIL} value={ETab.DETAIL} disabled />
                  <Tab label={ETab.STAGES} value={ETab.STAGES} />
                  <Tab label={ETab.GANTT} value={ETab.GANTT} />
                </Tabs>
              </Box>
            </Card>

            {tab === ETab.DETAIL && <DetailTab project={project} />}
            {tab === ETab.STAGES && (
              <StagesTab project={project} stages={stages} refetch={stageQuery.refetch} />
            )}
            {tab === ETab.GANTT && <GanttTab project={project} stages={stages} />}
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
