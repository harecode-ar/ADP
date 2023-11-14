'use client'

import * as React from 'react'
import { Container, Box } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { TableContextProvider } from 'src/components/table/context'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { paths } from 'src/routes/paths'
import Table from './table'

export default function ProjectListView() {
  const settings = useSettingsContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomBreadcrumbs
          heading="Proyectos"
          links={[{ name: 'Proyectos', href: paths.dashboard.project.root }, { name: 'Listado' }]}
        />
      </Box>
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  )
}
