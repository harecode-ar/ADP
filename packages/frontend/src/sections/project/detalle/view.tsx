'use client'

import React, { useMemo, useState } from 'react'
import { TASK_STATE, type IProject, type IStage } from '@adp/shared'
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
  Tooltip,
  Alert,
} from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { usePrint } from 'src/hooks/use-print'
import {
  GET_PROJECT,
  GET_STAGES_BY_PROJECT,
  GET_PROJECTS_ASSIGNED_TO_USER,
  GET_USER_VIEW_PROJECT,
} from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import Iconify from 'src/components/iconify/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import {
  colorFromAcpOrPacp,
  getTootipFromAcpOrPacp,
  getSeverityFromAcp,
} from 'src/utils/average-completition'
import { formatCost } from 'src/utils/format-number'
import StagesTab from './stages-tab'
import GanttTab from './gantt-tab'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import ChecklistTab from './checklist-tab'
import ModalEdit from './modal-edit'
import ModalFinishProject from './modal-finish-project'
import ModalStartTask from './modal-start-task'
import ModalCancelProject from './modal-cancel-project'

enum ETab {
  NOTES = 'Notas',
  STAGES = 'Etapas',
  GANTT = 'Gantt',
  CONTACTS = 'Contactos',
  CHECKLIST = 'Checklist',
}

type TProps = {
  projectId: string
}

export default function ProjectDetailView(props: TProps) {
  const { projectId } = props
  const [ref] = usePrint()
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const modalEdit = useBoolean()
  const modalFinishProject = useBoolean()
  const modalStartTask = useBoolean()
  const modalCancelTask = useBoolean()
  const [tab, setTab] = useState<ETab>(ETab.STAGES)

  const { data: access } = useQuery(GET_USER_VIEW_PROJECT, {
    variables: {
      projectId: Number(projectId),
    },
    skip: !projectId,
    onCompleted: (data) => {
      if (!data || !data.userViewProject) {
        enqueueSnackbar('No tienes permisos para ver este proyecto', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    }
  })

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

  const isProjectAssignedToUserQuery = useQuery(GET_PROJECTS_ASSIGNED_TO_USER, {
    variables: {
      id: Number(projectId),
    },
    skip: !projectId,
  })

  const refetch = () => {
    projectQuery.refetch()
    stageQuery.refetch()
    isProjectAssignedToUserQuery.refetch()
  }

  const project: IProject | null = useMemo(() => {
    if (!projectQuery.data) return null
    return projectQuery.data.project
  }, [projectQuery.data])

  const stages: IStage[] = useMemo(() => {
    if (!stageQuery.data) return []
    return stageQuery.data.stagesByProject
  }, [stageQuery.data])

  const isProjectAssignedToUser: boolean = useMemo(() => {
    if (!isProjectAssignedToUserQuery.data) return false
    return isProjectAssignedToUserQuery.data.projectAssignedToUser
  }, [isProjectAssignedToUserQuery.data])

  if (!access || !access.userViewProject) {
    return null;
  }

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
          heading="Detalle de Proyecto"
          links={[{ name: 'Proyecto', href: paths.dashboard.project.root }, { name: 'Detalle' }]}
          action={
            project &&
            project.stateId !== TASK_STATE.COMPLETED && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Button variant="contained" onClick={modalEdit.onTrue}>
                  <Iconify icon="material-symbols:edit" mr={1} />
                  Editar
                </Button>
                {project.stateId === TASK_STATE.NEW && (
                  <Button variant="contained" onClick={modalCancelTask.onTrue}>
                    <Iconify icon="material-symbols:cancel" mr={1} />
                    Cancelar proyecto
                  </Button>
                )}
                {project.stateId === TASK_STATE.ON_HOLD && isProjectAssignedToUser && (
                  <Button variant="contained" onClick={modalStartTask.onTrue}>
                    <Iconify icon="mdi:stopwatch-start-outline" mr={1} />
                    Comenzar
                  </Button>
                )}
                {project.stateId === TASK_STATE.IN_PROGRESS && (
                  <Button variant="contained" onClick={modalFinishProject.onTrue}>
                    <Iconify icon="pajamas:todo-done" mr={1} />
                    Finalizar
                  </Button>
                )}
              </Box>
            )
          }
        />

        {projectQuery.loading && <p>Cargando...</p>}

        {!!project && (
          <React.Fragment>
            {project.stateId === TASK_STATE.COMPLETED && (
              <Alert severity={getSeverityFromAcp(project.acp ?? null)}>
                El proyecto fue finalizado en la fecha: {formatDate(project.endDate)}
              </Alert>
            )}
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
                      value={formatCost(project.cost).replace('$', '')}
                      InputProps={{
                        readOnly: true,
                        endAdornment: <InputAdornment position="end">$</InputAdornment>,
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
                      value={`${(project.progress * 100).toFixed(0)}`}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Tooltip
                              title={getTootipFromAcpOrPacp(
                                project.acp ?? null,
                                project.pacp ?? null
                              )}
                            >
                              <Box
                                sx={{
                                  backgroundColor: colorFromAcpOrPacp(
                                    project.acp ?? null,
                                    project.pacp ?? null
                                  ),
                                  width: 15,
                                  height: 15,
                                  borderRadius: '50%',
                                }}
                              />
                            </Tooltip>
                          </InputAdornment>
                        ),
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
                {isProjectAssignedToUserQuery.data &&
                  isProjectAssignedToUserQuery.data.projectAssignedToUser && (
                    <Tab label={ETab.CHECKLIST} value={ETab.CHECKLIST} />
                  )}
              </Tabs>
            </Card>
            {tab === ETab.NOTES && <NotesTab project={project} />}
            {tab === ETab.STAGES && (
              <StagesTab project={project} stages={stages} refetch={refetch} />
            )}
            {tab === ETab.GANTT && <GanttTab project={project} stages={stages} />}
            {tab === ETab.CONTACTS && <ContactTab project={project} />}
            {tab === ETab.CHECKLIST && <ChecklistTab project={project} />}
            {modalEdit.value && (
              <ModalEdit
                modal={modalEdit}
                refetch={projectQuery.refetch}
                projectId={Number(projectId)}
              />
            )}
            {modalFinishProject.value && (
              <ModalFinishProject
                modal={modalFinishProject}
                refetch={projectQuery.refetch}
                projectId={Number(projectId)}
              />
            )}
          </React.Fragment>
        )}
      </Box>
      {!!project && modalStartTask.value && (
        <ModalStartTask
          modal={modalStartTask}
          project={project || null}
          stage={null}
          subStage={null}
          refetch={refetch}
        />
      )}

      {!!project && modalCancelTask.value && (
        <ModalCancelProject modal={modalCancelTask} project={project} refetch={refetch} />
      )}
    </Container>
  )
}
