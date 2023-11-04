'use client'

import type { IProject } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Box, Container, Card, Tab, Tabs } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { useSnackbar } from 'src/components/snackbar'
import { GET_PROJECT } from 'src/graphql/queries'
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
  const [tab, setTab] = useState<ETab>(ETab.DETAIL)

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

  const project: IProject | null = useMemo(() => {
    if (!projectQuery.data) return null
    return projectQuery.data.project
  }, [projectQuery.data])

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
            <Card sx={{ p: 2, maxHeight: 150, overflowY: 'scroll' }}>
              <pre>{JSON.stringify(project, null, 2)}</pre>
            </Card>

            <Card sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label={ETab.DETAIL} value={ETab.DETAIL} />
                  <Tab label={ETab.STAGES} value={ETab.STAGES} />
                  <Tab label={ETab.GANTT} value={ETab.GANTT} />
                </Tabs>
              </Box>
            </Card>

            {tab === ETab.DETAIL && <DetailTab project={project} />}
            {tab === ETab.STAGES && <StagesTab project={project} />}
            {tab === ETab.GANTT && <GanttTab project={project} />}
          </React.Fragment>
        )}
      </Box>
    </Container>
  )
}
