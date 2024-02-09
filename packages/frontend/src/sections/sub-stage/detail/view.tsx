'use client'

import React, { useMemo, useState } from 'react'
import { type IStage, TASK_STATE, TASK_STATE_NAME } from '@adp/shared'
import {
  Box,
  Container,
  Card,
  CardContent,
  Tab,
  Tabs,
  Grid,
  TextField,
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
import Iconify from 'src/components/iconify/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_STAGES_ASSIGNED_TO_USER, GET_SUB_STAGE, GET_USER_VIEW_STAGE } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import {
  colorFromAcpOrPacp,
  getTootipFromAcpOrPacp,
  getSeverityFromAcp,
} from 'src/utils/average-completition'
import ModalStartTask from 'src/sections/stage/detail/sub-stages-tab/kanban/view/modal-start-task'
import ModalFinishSubStage from 'src/sections/stage/detail/sub-stages-tab/kanban/view/modal-finish-substage'
import Label from 'src/components/label'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import ChecklistTab from './checklist-tab'
import ModalEdit from './modal-edit'
import ModalCancelSubStage from './modal-cancel-sub-stage'

const getColorVariant = (name: string) => {
  if (name === TASK_STATE_NAME.NEW) {
    return 'info'
  }
  if (name === TASK_STATE_NAME.IN_PROGRESS) {
    return 'warning'
  }
  if (name === TASK_STATE_NAME.ON_HOLD) {
    return 'warning'
  }
  if (name === TASK_STATE_NAME.COMPLETED) {
    return 'primary'
  }
  return 'error'
}

enum ETab {
  NOTES = 'Notas',
  CONTACTS = 'Contactos',
  CHECKLIST = 'Checklist',
}

type TProps = {
  subStageId: string
}

export default function ProjectDetailView(props: TProps) {
  const { subStageId } = props
  const [ref] = usePrint()
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const modalEdit = useBoolean()
  const [tab, setTab] = useState<ETab>(ETab.NOTES)
  const modalFinishSubStage = useBoolean()
  const modalStartTask = useBoolean()
  const modalCancelSubStage = useBoolean()

  const { data: access } = useQuery(GET_USER_VIEW_STAGE, {
    variables: {
      stageId: Number(subStageId),
    },
    skip: !subStageId,
    onCompleted: (data) => {
      if (!data || !data.userViewStage) {
        enqueueSnackbar('No tienes permisos para ver esta sub-etapa', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    }
  });

  const subStageQuery = useQuery(GET_SUB_STAGE, {
    variables: { id: Number(subStageId) },
    skip: !subStageId,
    onCompleted: (d) => {
      if (!d.subStage) {
        enqueueSnackbar('Sub Etapa no encontrada', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    },
  })

  const isStageAssignedToUserQuery = useQuery(GET_STAGES_ASSIGNED_TO_USER, {
    variables: {
      id: Number(subStageId),
    },
    skip: !subStageId,
  })

  const subStage: IStage | null = useMemo(() => {
    if (!subStageQuery.data) return null
    return subStageQuery.data.subStage
  }, [subStageQuery.data])

  const isStageAssignedToUser: boolean = useMemo(() => {
    if (!isStageAssignedToUserQuery.data) return false
    return isStageAssignedToUserQuery.data.stageAssignedToUser
  }, [isStageAssignedToUserQuery.data])

  const refetch = () => {
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
          heading="Detalle de Sub Etapa"
          links={[
            {
              name: subStage?.project.name,
              href: paths.dashboard.project.detail.replace(':id', String(subStage?.project.id)),
            },
            {
              name: subStage?.parentStage?.name,
              href: paths.dashboard.stage.detail.replace(':id', String(subStage?.parentStage?.id)),
            },
            { name: subStage?.name },
          ]}
          action={
            subStage &&
            subStage.stateId !== TASK_STATE.COMPLETED && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                {subStage &&
                  subStage.stateId !== TASK_STATE.CANCELLED &&
                  subStage.stateId !== TASK_STATE.COMPLETED && (
                    <Button variant="contained" onClick={modalEdit.onTrue}>
                      <Iconify icon="material-symbols:edit" mr={1} />
                      Editar
                    </Button>
                  )}
                {subStage && subStage.stateId === TASK_STATE.NEW && (
                  <Button variant="contained" onClick={modalCancelSubStage.onTrue}>
                    <Iconify icon="material-symbols:cancel" mr={1} />
                    Cancelar sub etapa
                  </Button>
                )}
                {subStage && subStage.stateId === TASK_STATE.ON_HOLD && isStageAssignedToUser && (
                  <Button variant="contained" onClick={modalStartTask.onTrue}>
                    <Iconify icon="mdi:stopwatch-start-outline" mr={1} />
                    Comenzar
                  </Button>
                )}
                {subStage && subStage.stateId === TASK_STATE.IN_PROGRESS && (
                  <Button variant="contained" onClick={modalFinishSubStage.onTrue}>
                    <Iconify icon="pajamas:todo-done" mr={1} />
                    Finalizar
                  </Button>
                )}
              </Box>
            )
          }
        />

        {subStageQuery.loading && <p>Cargando...</p>}

        {!!subStage && (
          <Box>
            {subStage.stateId === TASK_STATE.COMPLETED && (
              <Box sx={{ mb: 2 }}>
                <Alert severity={getSeverityFromAcp(subStage.acp ?? null)}>
                  La sub-etapa fue finalizada en la fecha: {formatDate(subStage.endDate)}
                </Alert>
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Tooltip
                            title={getTootipFromAcpOrPacp(
                              subStage.acp ?? null,
                              subStage.pacp ?? null
                            )}
                          >
                            <Box
                              sx={{
                                backgroundColor: colorFromAcpOrPacp(
                                  subStage.acp ?? null,
                                  subStage.pacp ?? null
                                ),
                                width: 15,
                                height: 15,
                                borderRadius: '50%',
                                marginRight: 1,
                              }}
                            />
                          </Tooltip>
                          <Label color={getColorVariant(subStage.state.name)} variant="filled">
                            {subStage.state.name}
                          </Label>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="name"
                          name="name"
                          label="Nombre"
                          variant="outlined"
                          fullWidth
                          value={subStage.name}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="startDate"
                          name="startDate"
                          label="Inicio"
                          variant="outlined"
                          fullWidth
                          value={formatDate(subStage.startDate)}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="endDate"
                          name="endDate"
                          label="Finalizacion"
                          variant="outlined"
                          fullWidth
                          value={formatDate(subStage.endDate)}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="area"
                          name="area"
                          label="Area"
                          variant="outlined"
                          fullWidth
                          value={subStage.area ? subStage.area.name : 'Sin area'}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          id="responsible"
                          name="responsible"
                          label="Responsable"
                          variant="outlined"
                          fullWidth
                          value={
                            subStage.responsible ? subStage.responsible.fullname : 'Sin responsable'
                          }
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="description"
                          name="description"
                          label="Descripción"
                          variant="outlined"
                          fullWidth
                          multiline
                          maxRows={10}
                          value={subStage.description}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label={ETab.NOTES} value={ETab.NOTES} />
                    <Tab label={ETab.CONTACTS} value={ETab.CONTACTS} />
                    {isStageAssignedToUserQuery.data &&
                      isStageAssignedToUserQuery.data.stageAssignedToUser && (
                        <Tab label={ETab.CHECKLIST} value={ETab.CHECKLIST} />
                      )}
                  </Tabs>
                </Card>
                {tab === ETab.NOTES && <NotesTab subStage={subStage} />}
                {tab === ETab.CONTACTS && <ContactTab subStage={subStage} />}
                {tab === ETab.CHECKLIST && <ChecklistTab subStage={subStage} />}

                {modalFinishSubStage.value && (
                  <ModalFinishSubStage
                    modal={modalFinishSubStage}
                    refetch={subStageQuery.refetch}
                    subStageId={Number(subStageId)}
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {modalEdit.value && (
        <ModalEdit
          modal={modalEdit}
          project={subStage?.project}
          stage={subStage}
          refetch={refetch}
        />
      )}
      {modalStartTask.value && (
        <ModalStartTask
          modal={modalStartTask}
          project={null}
          stage={null}
          subStage={subStage || null}
          refetch={refetch}
        />
      )}
      {!!subStage && modalCancelSubStage.value && (
        <ModalCancelSubStage modal={modalCancelSubStage} stage={subStage} refetch={refetch} />
      )}
    </Container>
  )
}
