'use client'

import * as React from 'react'
import { Container, Box } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { useBoolean } from 'src/hooks/use-boolean'
import { TableContextProvider } from 'src/components/table/context'
import { paths } from 'src/routes/paths'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import Table from './table'

// ----------------------------------------------------------------------

export default function UserListView() {
  const settings = useSettingsContext()
  const modalCreate = useBoolean()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomBreadcrumbs
          heading="Usuarios"
          links={[{ name: 'Usuarios', href: paths.dashboard.user.root }, { name: 'Listado' }]}
        />
      </Box>
      <TableContextProvider>
        <Table modalCreate={modalCreate} />
      </TableContextProvider>
    </Container>
  )
}
