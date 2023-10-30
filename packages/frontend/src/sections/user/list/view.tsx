'use client'

import * as React from 'react'
import { Container, Typography, Box, IconButton } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { TableContextProvider } from 'src/components/table/context'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import Table from './table'

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext()

  const modalCreate = useBoolean()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 2 }} variant="h4">
          Usuarios
        </Typography>
        <IconButton onClick={modalCreate.onTrue}>
          <Iconify icon="mingcute:add-fill" />
        </IconButton>
      </Box>
      <TableContextProvider>
        <Table modalCreate={modalCreate} />
      </TableContextProvider>
    </Container>
  )
}
