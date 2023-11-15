'use client'

import * as React from 'react'
import { Container, Box, Button, Link } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import Iconify from 'src/components/iconify/iconify'
import { TableContextProvider } from 'src/components/table/context'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { paths } from 'src/routes/paths'
import Table from './table'

export default function ProjectListView() {
  const settings = useSettingsContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <CustomBreadcrumbs
          heading="Proyectos"
          links={[{ name: 'Proyectos', href: paths.dashboard.project.root }, { name: 'Listado' }]}
        />
        <Link href={paths.dashboard.project.new}>
          <Button variant="contained">
            <Iconify icon="mingcute:add-fill" mr={1} />
            Nuevo
          </Button>
        </Link>
      </Box>
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  )
}
