'use client'

import React, { useMemo, useState } from 'react'
import type { IStage } from '@adp/shared'
import { Box, Container, Card, CardContent, Tab, Tabs, Grid, TextField } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_SUB_STAGE } from 'src/graphql/queries'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { formatDate } from 'src/utils/format-time'
import NotesTab from './notes-tab'
import ContactTab from './contact-tab'

enum ETab {
  NOTES = 'Notas',
  CONTACTS = 'Contactos',
}

type TProps = {
  subStageId: string
}

export default function ProjectDetailView(props: TProps) {
  const { subStageId } = props
  const settings = useSettingsContext()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [tab, setTab] = useState<ETab>(ETab.NOTES)

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
          heading="Detalle de Sub Etapa"
          links={[{ name: 'Sub Etapa', href: paths.dashboard.subStage.root }, { name: 'Detalle' }]}
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
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
