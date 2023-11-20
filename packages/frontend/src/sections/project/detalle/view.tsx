'use client'

import React, { useMemo, useState } from 'react'
import type { IProject, IStage } from '@adp/shared'
import { Box, Container, Card, Tab, Tabs, Grid, Typography, Divider } from '@mui/material'
import Label from 'src/components/label'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_PROJECT, GET_STAGES_BY_PROJECT } from 'src/graphql/queries'

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import StagesTab from './stages-tab'
import GanttTab from './gantt-tab'
import NotesTab from './notes-tab'

const getColorVariant = (name: string) => {
  if (name === 'Nuevo') {
    return 'info'
  }
  if (name === 'En progreso') {
    return 'warning'
  }
  if (name === 'Completado') {
    return 'primary'
  }
  return 'error'
}

enum ETab {
  NOTES = 'Notas',
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
    const [anno, mes, dia] = dateString.split('-')
    const nuevaFechaString = `${dia}/${mes}/${anno}`
    return nuevaFechaString
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
          // heading="Detalle de Proyecto"
          links={[{ name: 'Proyecto', href: paths.dashboard.project.root }, { name: 'Detalle' }]}
        />

        {projectQuery.loading && <p>Cargando...</p>}

        {!!project && (
          <React.Fragment>
            <Box>
              {/* Project Header */}
              <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                {project.name}
                <Label variant="soft" sx={{ ml: 2 }} color={getColorVariant(project.state.name)}>
                  {project.state.name}:
                  <span style={{ fontSize: '0.8em', marginLeft: 4 }}>
                    {project.progress * 100}%
                  </span>
                </Label>
              </Typography>
              {/* Area and Responsible */}
              <Typography variant="h6" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                {project?.area?.name} -
                <span style={{ fontSize: '0.8em', marginLeft: 4 }}>
                  {project.responsible ? project.responsible.fullname : 'Sin responsable'}
                </span>
              </Typography>
            </Box>

            <Divider />

            {/* Project Details */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Costo proyectado
                </Typography>
                <Typography variant="body1" paragraph>
                  {project.cost} $
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Fecha de inicio
                </Typography>
                <Typography variant="body1" paragraph>
                  {formatDate(project.startDate)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Fecha de finalización
                </Typography>
                <Typography variant="body1" paragraph>
                  {formatDate(project.endDate)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Descripción
                </Typography>
                <Typography variant="body1" paragraph>
                  {project.description}
                </Typography>
              </Grid>
            </Grid>

            <Card>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1,
                }}
              >
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label={ETab.NOTES} value={ETab.NOTES} />
                  <Tab label={ETab.STAGES} value={ETab.STAGES} />
                  <Tab label={ETab.GANTT} value={ETab.GANTT} />
                </Tabs>
              </Box>

              {tab === ETab.NOTES && <NotesTab project={project} />}
              {tab === ETab.STAGES && (
                <StagesTab project={project} stages={stages} refetch={stageQuery.refetch} />
              )}
              {tab === ETab.GANTT && <GanttTab project={project} stages={stages} />}
            </Card>
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
