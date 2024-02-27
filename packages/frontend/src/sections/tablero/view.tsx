'use client'

import React, { useMemo, useState } from 'react'
import { Container, Card, Box, Tabs, Tab } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { usePrint } from 'src/hooks/use-print'
import { DashboardReportProvider } from 'src/contexts/dashboard-report-context'
import { useQuery } from '@apollo/client'
import { GET_COUNT_USER_ASSIGNATIONS } from 'src/graphql/queries'
import { localStorageGetItem, localStorageSetItem } from 'src/utils/storage-available'
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

const DASHBOARD_TAB = 'dashboard_tab'

const getSelectedTab = () => {
  const selectedTab = localStorageGetItem(DASHBOARD_TAB) as ETab
  if (Object.values(ETab).includes(selectedTab)) {
    return selectedTab
  }
  return ETab.ASSIGNMENT
}

export default function TableroView() {
  const settings = useSettingsContext()
  const [ref] = usePrint()
  const [tab, setTab] = useState<ETab>(getSelectedTab())
  const { data } = useQuery(GET_COUNT_USER_ASSIGNATIONS)

  const isAssignmentTabDisabled: boolean = useMemo(() => {
    if (!data) return true
    return data.countUserAssignations === 0
  }, [data])

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: ETab) => {
    setTab(newValue)
    localStorageSetItem(DASHBOARD_TAB, newValue)
  }

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
            <Tabs value={tab} onChange={handleTabChange}>
              <Tab label={ETab.AREAS} value={ETab.AREAS} sx={{ pl: 1, color: '#a63dfd' }}/>
              <Tab
                label={ETab.ASSIGNMENT}
                value={ETab.ASSIGNMENT}
                sx={{ pl: 1, color: '#a63dfd' }}
                disabled={isAssignmentTabDisabled}
              />
              <Tab label={ETab.REPORT} value={ETab.REPORT} sx={{ pl: 1, color: '#a63dfd' }} />
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
