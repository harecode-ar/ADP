'use client'

import * as React from 'react'
import { Container, Typography, Box } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { TableContextProvider } from 'src/components/table/context'

import Table from './table'

export default function ProjectListView() {
  const settings = useSettingsContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 2 }} variant="h4">
          Proyectos
        </Typography>
      </Box>
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  )
}
