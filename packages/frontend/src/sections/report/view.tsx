'use client'

import React, { useState } from 'react'
import { Container, Card, Box, Tabs, Tab, Alert } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { usePrint } from 'src/hooks/use-print'
import AreaTab from './area-tab'
import UserTab from './user-tab'

// ----------------------------------------------------------------------

enum ETab {
  AREAS = 'Areas',
  USERS = 'Usuarios',
}

export default function TableroView() {
  const settings = useSettingsContext()
  const [ref] = usePrint()
  const [tab, setTab] = useState<ETab>(ETab.AREAS)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              <Tab label={ETab.USERS} value={ETab.USERS} />
            </Tabs>
          </Box>
        </Card>

        <Alert
          severity="info"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            padding: 1,
          }}
        >
          Los números representan los porcentajes de exceso (circulo de color rojo) o ahorro
          (circulo de color verde) de tiempo de los proyectos o etapas
        </Alert>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: tab === ETab.AREAS ? 'block' : 'none' }}>
            <AreaTab />
          </Box>
          <Box sx={{ display: tab === ETab.USERS ? 'block' : 'none' }}>
            <UserTab />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
