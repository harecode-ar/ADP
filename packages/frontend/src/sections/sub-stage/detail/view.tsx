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
  Button,
} from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { usePrint } from 'src/hooks/use-print'
import Iconify from 'src/components/iconify/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import StagePath from 'src/sections/stage/detail/stage-path'
import { GET_SUB_STAGE } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import ModalFinishSubStage from 'src/sections/stage/detail/sub-stages-tab/kanban/view/modal-finish-substage'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'
import ModalEdit from './modal-edit'

enum ETab {
  NOTES = 'Notas',
  CONTACTS = 'Contactos',
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
          links={[{ name: 'Sub Etapa', href: paths.dashboard.subStage.root }, { name: 'Detalle' }]}
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
              {subStage && subStage.stateId !== STAGE_STATE.COMPLETED && (
                <Button variant="contained" onClick={modalFinishSubStage.onTrue}>
                  <Iconify icon="pajamas:todo-done" mr={1} />
                  Finalizar
                </Button>
              )}
            </Box>
          }
        />

        <StagePath
          project={subStage?.project || null}
          stage={subStage?.parentStage || null}
          subStage={subStage || null}
        />

        {subStageQuery.loading && <p>Cargando...</p>}

        {!!subStage && (
          <React.Fragment>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
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
                      id="status"
                      name="status"
                      label="Estado"
                      variant="outlined"
                      fullWidth
                      value={subStage.state.name}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="startDate"
                      name="startDate"
                      label="Fecha de inicio"
                      variant="outlined"
                      fullWidth
                      value={formatDate(subStage.startDate)}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="endDate"
                      name="endDate"
                      label="Fecha de finalizacion"
                      variant="outlined"
                      fullWidth
                      value={formatDate(subStage.endDate)}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
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
                  <Grid item xs={12} md={3}>
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
          </React.Fragment>
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
