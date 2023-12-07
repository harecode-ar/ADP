'use client'

import React, { useMemo, useState } from 'react'
import type { IProject, IStage } from '@adp/shared'
import {
  Box,
  Container,
  Card,
  CardContent,
  Tab,
  Tabs,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_PROJECT, GET_STAGES_BY_PROJECT } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import Iconify from 'src/components/iconify/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import StagesTab from './stages-tab'
import GanttTab from './gantt-tab'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import ModalEdit from './modal-edit'

enum ETab {
  NOTES = 'Notas',
  STAGES = 'Etapas',
  GANTT = 'Gantt',
  CONTACTS = 'Contactos',
}

type TProps = {
  projectId: string
}

export default function ProjectDetailView(props: TProps) {
  const { projectId } = props
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const modalEdit = useBoolean()
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

  const refetch = () => {
    projectQuery.refetch()
    stageQuery.refetch()
  }

  const project: IProject | null = useMemo(() => {
    if (!projectQuery.data) return null
    return projectQuery.data.project
  }, [projectQuery.data])

  const stages: IStage[] = useMemo(() => {
    if (!stageQuery.data) return []
    return stageQuery.data.stagesByProject
  }, [stageQuery.data])

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
          action={
            <Button variant="contained" onClick={modalEdit.onTrue}>
              <Iconify icon="material-symbols:edit" mr={1} />
              Editar
            </Button>
          }
        />

        {projectQuery.loading && <p>Cargando...</p>}

        {!!project && (
          <React.Fragment>
            <Card>
              <CardContent>
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
                      label="Costo proyectado"
                      variant="outlined"
                      fullWidth
                      value={project.cost}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">$</InputAdornment>,
                        readOnly: true,
                      }}
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
                      value={formatDate(project.endDate)}
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
                      value={`${project.progress * 100}`}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        readOnly: true,
                      }}
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
                      maxRows={10}
                      value={project.description}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card
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
                <Tab label={ETab.CONTACTS} value={ETab.CONTACTS} />
              </Tabs>
            </Card>
            {tab === ETab.NOTES && <NotesTab project={project} />}
            {tab === ETab.STAGES && (
              <StagesTab project={project} stages={stages} refetch={refetch} />
            )}
            {tab === ETab.GANTT && <GanttTab project={project} stages={stages} />}
            {tab === ETab.CONTACTS && <ContactTab project={project} />}
            {modalEdit.value && (
              <ModalEdit
                modal={modalEdit}
                projectId={Number(projectId)}
                refetch={projectQuery.refetch}
              />
            )}
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
