'use client'

import React, { useState } from 'react'
import { Container, Card, Box, Tabs, Tab } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { DashboardReportProvider } from 'src/contexts/dashboard-report-context'
import { IArea } from '@adp/shared'
import UserCard from './user-card'
import AreaTab from './area-tab'
import AssignmentTab from './assignment-tab'
import ReportTab from './report-tab'


// ----------------------------------------------------------------------

enum ETab {
  AREAS = 'Areas',
  ASSIGNMENT = 'Asignaciones',
  REPORT = 'Estadísticas',
}

type TProps = {
  areas: IArea[]
}

export default function TableroView(props: TProps) {
  const { areas } = props
  const settings = useSettingsContext()
  const [tab, setTab] = useState<ETab>(ETab.AREAS)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <UserCard />
        <Card sx={{ p: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab label={ETab.AREAS} value={ETab.AREAS} />
              <Tab label={ETab.ASSIGNMENT} value={ETab.ASSIGNMENT} sx={{ pl: 1 }} />
              <Tab label={ETab.REPORT} value={ETab.REPORT} sx={{ pl: 1 }} />
            </Tabs>
          </Box>
        </Card>
        {tab === ETab.AREAS && <AreaTab />}
        {tab === ETab.ASSIGNMENT && <AssignmentTab />}
        {tab === ETab.REPORT && (
          <DashboardReportProvider>
            <ReportTab areas={areas}/>
          </DashboardReportProvider>
        )}
      </Box>
    </Container>
  )
}
