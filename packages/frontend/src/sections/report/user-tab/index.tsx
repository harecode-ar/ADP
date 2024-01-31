'use client'

import * as React from 'react'
import { Container } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { usePrint } from 'src/hooks/use-print'
import { TableContextProvider } from 'src/components/table/context'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { paths } from 'src/routes/paths'
import Table from './table'

export default function UserListView() {
  const settings = useSettingsContext()
  const [ref] = usePrint()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <CustomBreadcrumbs
        heading="Usuarios"
        links={[{ name: 'Usuarios', href: paths.dashboard.user.root }, { name: 'Listado' }]}
      />
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  )
}
