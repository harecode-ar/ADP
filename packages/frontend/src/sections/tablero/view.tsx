'use client'

import React, { useState } from 'react'
import { Container, Card, Box, Tabs, Tab } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import UserCard from './user-card'
import AreaCardContainer from './area-card-container'

// ----------------------------------------------------------------------

enum ETab {
  AREAS = 'Areas',
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
          </Box>
        </Card>
        <Card sx={{ p: 2 }}>
          {tab === ETab.AREAS && <AreaCardContainer />}
        </Card>
      </Box>
    </Container>
  )
}
