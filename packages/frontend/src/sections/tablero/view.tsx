'use client'

import React, { useState } from 'react'
import { Container, Card, Box, Tabs, Tab } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { usePrint } from 'src/hooks/use-print'
import { DashboardReportProvider } from 'src/contexts/dashboard-report-context'
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

export default function TableroView() {
  const settings = useSettingsContext()
  const [ref] = usePrint()
  const [tab, setTab] = useState<ETab>(ETab.AREAS)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: tab === ETab.AREAS ? 'block' : 'none' }}>
            <AreaTab />
          </Box>
          <Box sx={{ display: tab === ETab.ASSIGNMENT ? 'block' : 'none' }}>
            <AssignmentTab />
          </Box>
          <Box sx={{ display: tab === ETab.REPORT ? 'block' : 'none' }}>
            <DashboardReportProvider>
              <ReportTab />
            </DashboardReportProvider>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
