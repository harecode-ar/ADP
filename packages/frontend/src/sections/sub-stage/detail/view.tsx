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
import { GET_SUB_STAGE } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import {
  getColorFromAcp,
  getColorFromPacp,
  getTooltipFromAcp,
  getTooltipFromPacp,
} from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'
import { SUCCESS, WARNING, ERROR } from 'src/theme/palette';
import ModalFinishSubStage from 'src/sections/stage/detail/sub-stages-tab/kanban/view/modal-finish-substage'
import Label from 'src/components/label'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import ModalEdit from './modal-edit'

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
  CONTACTS = 'Contactos',
}

type TProps = {
  subStageId: string
}

const colorFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getColorFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getColorFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

const getTootipFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getTooltipFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getTooltipFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

const getSeverityFromAcp = (acp: number | null) => {
    const severity = getColorFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
    switch (severity) {
      case SUCCESS.main:
        return 'success'
      case WARNING.main:
        return 'warning'
      case ERROR.main:
        return 'error'
      default:
        return 'info'
    }
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

  const subStage: IStage | null = useMemo(() => {
    if (!subStageQuery.data) return null
    return subStageQuery.data.subStage
  }, [subStageQuery.data])

  const refetch = () => {
    subStageQuery.refetch()
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
                <Button variant="contained" onClick={modalFinishSubStage.onTrue}>
                  <Iconify icon="pajamas:todo-done" mr={1} />
                  Finalizar
                </Button>
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
                </Tabs>
              </Card>
              {tab === ETab.NOTES && <NotesTab subStage={subStage} />}
              {tab === ETab.CONTACTS && <ContactTab subStage={subStage} />}

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
    </Container>
  )
}
