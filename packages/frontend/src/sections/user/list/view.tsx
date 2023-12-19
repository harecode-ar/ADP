'use client'

import * as React from 'react'
import { Container, Button } from '@mui/material'
import Iconify from 'src/components/iconify/iconify'
import { useSettingsContext } from 'src/components/settings'
import { useBoolean } from 'src/hooks/use-boolean'
import { usePrint } from 'src/hooks/use-print'
import { TableContextProvider } from 'src/components/table/context'
import { paths } from 'src/routes/paths'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import Table from './table'

// ----------------------------------------------------------------------

export default function UserListView() {
  const [ref] = usePrint()
  const settings = useSettingsContext()
  const modalCreate = useBoolean()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <CustomBreadcrumbs
        heading="Usuarios"
        links={[{ name: 'Usuarios', href: paths.dashboard.user.root }, { name: 'Listado' }]}
        action={
          <Button variant="contained" onClick={modalCreate.onTrue}>
            <Iconify icon="mingcute:add-fill" mr={1} />
            Nuevo
          </Button>
        }
      />
      <TableContextProvider>
        <Table modalCreate={modalCreate} />
      </TableContextProvider>
    </Container>
  )
}
