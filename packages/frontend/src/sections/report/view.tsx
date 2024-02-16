'use client'

import React, { useState } from 'react'
import { Container, Card, Box, Tabs, Tab, Alert } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { useTheme } from '@mui/material/styles'
import { usePrint } from 'src/hooks/use-print'
import { ERROR, SUCCESS } from 'src/theme/palette'
import AreaTab from './area-tab'
import UserTab from './user-tab'

// ----------------------------------------------------------------------

enum ETab {
  AREAS = 'Areas',
  USERS = 'Usuarios',
}

const errorUnderline = {
  textDecoration: 'underline',
  textDecorationColor: ERROR.main,
}

const successUnderline = {
  textDecoration: 'underline',
  textDecorationColor: SUCCESS.main,
}

export default function TableroView() {
  const settings = useSettingsContext()
  const [ref] = usePrint()
  const [tab, setTab] = useState<ETab>(ETab.AREAS)
  const theme = useTheme()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
          Los números representan los porcentajes de <strong style={errorUnderline}>exceso</strong>
          <Box
            sx={{
              backgroundColor: theme.palette.error.main,
              width: 13,
              height: 13,
              borderRadius: '50%',
              marginX: 1,
              display: 'inline-block',
            }}
          />
          o <strong style={successUnderline}>ahorro</strong>
          <Box
            sx={{
              backgroundColor: theme.palette.success.main,
              width: 13,
              height: 13,
              borderRadius: '50%',
              marginX: 1,
              display: 'inline-block',
            }}
          />
          de tiempo de los proyectos o etapas
        </Alert>
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
