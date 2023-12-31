'use client'

import React, { useMemo, useState } from 'react'
import { type IStage, STAGE_STATE } from '@adp/shared'
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
import { usePrint } from 'src/hooks/use-print'
import { GET_STAGE, GET_SUB_STAGES_BY_STAGE } from 'src/graphql/queries'
import Iconify from 'src/components/iconify/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import ModalFinishStage from 'src/sections/project/detalle/stages-tab/kanban/view/modal-finish-stage'
import SubStagesTab from './sub-stages-tab'
import GanttTab from './gantt-tab'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import StagePath from './stage-path'
import ModalEdit from './modal-edit'

enum ETab {
  NOTES = 'Notas',
  SUB_STAGES = 'Sub etapas',
  GANTT = 'Gantt',
  CONTACTS = 'Contactos',
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
  const [tab, setTab] = useState<ETab>(ETab.NOTES)
  const modalFinishStage = useBoolean()

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

  const stage: IStage | null = useMemo(() => {
    if (!stageQuery.data) return null
    return stageQuery.data.stage
  }, [stageQuery.data])

  const subStages: IStage[] = useMemo(() => {
    if (!subStageQuery.data) return []
    return subStageQuery.data.subStagesByStage
  }, [subStageQuery.data])

  const refetch = () => {
    stageQuery.refetch()
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
          heading="Detalle de Etapa"
          links={[{ name: 'Etapa', href: paths.dashboard.project.root }, { name: 'Detalle' }]}
          action={
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
              {stage && stage.stateId !== STAGE_STATE.COMPLETED && (
                <Button variant="contained" onClick={modalFinishStage.onTrue}>
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
                  <Grid item xs={12} md={stage.hasStages ? 2 : 3}>
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
                  <Grid item xs={12} md={stage.hasStages ? 2 : 3}>
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
                  {stage.hasStages ? (
                    <Grid item xs={12} md={2}>
                      <TextField
                        id="progress"
                        name="progress"
                        label="Progreso"
                        variant="outlined"
                        fullWidth
                        value={`${stage.progress * 100}`}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">%</InputAdornment>,
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  ) : null}
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
              </Tabs>
            </Card>
            {tab === ETab.NOTES && <NotesTab stage={stage} />}

            {tab === ETab.SUB_STAGES && (
              <SubStagesTab stage={stage} subStages={subStages} refetch={refetch} />
            )}

            {tab === ETab.GANTT && <GanttTab stage={stage} subStages={subStages} />}

            {tab === ETab.CONTACTS && <ContactTab stage={stage} />}

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
    </Container>
  )
}
