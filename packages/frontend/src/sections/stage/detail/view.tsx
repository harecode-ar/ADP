'use client'

import React, { useMemo, useState } from 'react'
import { type IStage, TASK_STATE } from '@adp/shared'
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
  GET_STAGE,
  GET_STAGES_ASSIGNED_TO_USER,
  GET_SUB_STAGES_BY_STAGE,
  GET_USER_VIEW_STAGE,
} from 'src/graphql/queries'
import Iconify from 'src/components/iconify/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import {
  colorFromAcpOrPacp,
  getTootipFromAcpOrPacp,
  getSeverityFromAcp,
} from 'src/utils/average-completition'
import ModalFinishStage from 'src/sections/project/detalle/stages-tab/kanban/view/modal-finish-stage'
import SubStagesTab from './sub-stages-tab'
import GanttTab from './gantt-tab'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import ChecklistTab from './checklist-tab'
import StagePath from './stage-path'
import ModalEdit from './modal-edit'
import ModalStartTask from './sub-stages-tab/kanban/view/modal-start-task'
import ModalCancelStage from './modal-cancel-stage'

enum ETab {
  NOTES = 'Notas',
  SUB_STAGES = 'Sub etapas',
  GANTT = 'Gantt',
  CONTACTS = 'Contactos',
  CHECKLIST = 'Checklist',
}

type TProps = {
  stageId: string
}

export default function ProjectDetailView(props: TProps) {
  const { stageId } = props
  const [ref] = usePrint()
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const modalEdit = useBoolean()
  const [tab, setTab] = useState<ETab>(ETab.SUB_STAGES)
  const modalFinishStage = useBoolean()
  const modalStartTask = useBoolean()
  const modalCancelStage = useBoolean()

  const { data: access } = useQuery(GET_USER_VIEW_STAGE, {
    variables: {
      stageId: Number(stageId),
    },
    skip: !stageId,
    onCompleted: (data) => {
      if (!data || !data.userViewStage) {
        enqueueSnackbar('No tienes permisos para ver esta etapa', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    }
  });

  const stageQuery = useQuery(GET_STAGE, {
    variables: { id: Number(stageId) },
    skip: !stageId,
    onCompleted: (d) => {
      if (!d.stage) {
        enqueueSnackbar('Etapa no encontrada', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    },
  })

  const subStageQuery = useQuery(GET_SUB_STAGES_BY_STAGE, {
    variables: { stageId: Number(stageId) },
    skip: !stageId,
  })

  const isStageAssignedToUserQuery = useQuery(GET_STAGES_ASSIGNED_TO_USER, {
    variables: {
      id: Number(stageId),
    },
    skip: !stageId,
  })

  const stage: IStage | null = useMemo(() => {
    if (!stageQuery.data) return null
    return stageQuery.data.stage
  }, [stageQuery.data])

  const subStages: IStage[] = useMemo(() => {
    if (!subStageQuery.data) return []
    return subStageQuery.data.subStagesByStage
  }, [subStageQuery.data])

  const isStageAssignedToUser: boolean = useMemo(() => {
    if (!isStageAssignedToUserQuery.data) return false
    return isStageAssignedToUserQuery.data.stageAssignedToUser
  }, [isStageAssignedToUserQuery.data])

  const refetch = () => {
    stageQuery.refetch()
    subStageQuery.refetch()
    isStageAssignedToUserQuery.refetch()
  }

  if (!access || !access.userViewStage) {
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
          heading="Detalle de Etapa"
          links={[{ name: 'Etapa', href: paths.dashboard.project.root }, { name: 'Detalle' }]}
          action={
            <Box
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              {stage &&
                stage.stateId !== TASK_STATE.CANCELLED &&
                stage.stateId !== TASK_STATE.COMPLETED && (
                  <Button variant="contained" onClick={modalEdit.onTrue}>
                    <Iconify icon="material-symbols:edit" mr={1} />
                    Editar
                  </Button>
                )}
              {stage?.stateId === TASK_STATE.NEW && (
                <Button variant="contained" onClick={modalCancelStage.onTrue} color="error">
                  <Iconify icon="material-symbols:cancel" mr={1} />
                  Cancelar etapa
                </Button>
              )}
              {stage && stage.stateId === TASK_STATE.ON_HOLD && isStageAssignedToUser && (
                <Button variant="contained" onClick={modalStartTask.onTrue} color="primary">
                  <Iconify icon="mdi:stopwatch-start-outline" mr={1} />
                  Comenzar
                </Button>
              )}
              {stage && stage.stateId === TASK_STATE.IN_PROGRESS && (
                <Button variant="contained" onClick={modalFinishStage.onTrue} color="primary">
                  <Iconify icon="pajamas:todo-done" mr={1} />
                  Finalizar
                </Button>
              )}
            </Box>
          }
        />

        <StagePath project={stage?.project || null} stage={stage} subStage={null} />

        {stageQuery.loading && <p>Cargando...</p>}

        {!!stage && (
          <React.Fragment>
            {stage.stateId === TASK_STATE.COMPLETED && (
              <Alert severity={getSeverityFromAcp(stage.acp ?? null)}>
                La etapa fue finalizada en la fecha: {formatDate(stage.endDate)}
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
                      value={stage.name}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  {/* status */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="status"
                      name="status"
                      label="Estado"
                      variant="outlined"
                      fullWidth
                      value={stage.state.name}
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
                      value={formatDate(stage.startDate)}
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
                      value={formatDate(stage.endDate)}
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
                      value={`${(stage.progress * 100).toFixed(0)}`}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Tooltip
                              title={getTootipFromAcpOrPacp(stage.acp ?? null, stage.pacp ?? null)}
                            >
                              <Box
                                sx={{
                                  backgroundColor: colorFromAcpOrPacp(
                                    stage.acp ?? null,
                                    stage.pacp ?? null
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
                      value={stage.area ? stage.area.name : 'Sin area'}
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
                      value={stage.responsible ? stage.responsible.fullname : 'Sin responsable'}
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
                      value={stage.description}
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
                <Tab label={ETab.SUB_STAGES} value={ETab.SUB_STAGES} />
                <Tab label={ETab.GANTT} value={ETab.GANTT} />
                <Tab label={ETab.CONTACTS} value={ETab.CONTACTS} />
                {isStageAssignedToUserQuery.data &&
                  isStageAssignedToUserQuery.data.stageAssignedToUser && (
                    <Tab label={ETab.CHECKLIST} value={ETab.CHECKLIST} />
                  )}
              </Tabs>
            </Card>
            {tab === ETab.NOTES && <NotesTab stage={stage} />}

            {tab === ETab.SUB_STAGES && (
              <SubStagesTab stage={stage} subStages={subStages} refetch={refetch} />
            )}

            {tab === ETab.GANTT && <GanttTab stage={stage} subStages={subStages} />}

            {tab === ETab.CONTACTS && <ContactTab stage={stage} />}

            {tab === ETab.CHECKLIST && <ChecklistTab stage={stage} />}

            {modalFinishStage.value && (
              <ModalFinishStage
                modal={modalFinishStage}
                refetch={stageQuery.refetch}
                stageId={Number(stageId)}
              />
            )}
          </React.Fragment>
        )}
      </Box>

      {modalEdit.value && (
        <ModalEdit modal={modalEdit} project={stage?.project} stage={stage} refetch={refetch} />
      )}
      {modalStartTask.value && (
        <ModalStartTask
          modal={modalStartTask}
          project={null}
          stage={stage || null}
          subStage={null}
          refetch={refetch}
        />
      )}
      {!!stage && modalCancelStage.value && (
        <ModalCancelStage modal={modalCancelStage} stage={stage} refetch={refetch} />
      )}
    </Container>
  )
}
