'use client'

import React, { useState } from 'react'
import { Container, Card, Box, Tabs, Tab } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import UserCard from './user-card'
import AreaTab from './area-tab'
import AssignmentTab from './assignment-tab'

// ----------------------------------------------------------------------

enum ETab {
  AREAS = 'Areas',
  ASSIGNMENT = 'Asignaciones',
}

export default function TableroView() {
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
            </Tabs>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab label={ETab.ASSIGNMENT} value={ETab.ASSIGNMENT} sx={{ pl: 1 }}/>
            </Tabs>
          </Box>
        </Card>
        <Card sx={{ p: 2 }}>{tab === ETab.AREAS && <AreaTab />}</Card>
        <Card sx={{ p: 2 }}>{tab === ETab.ASSIGNMENT && <AssignmentTab />}</Card>
      </Box>
    </Container>
  )
}
