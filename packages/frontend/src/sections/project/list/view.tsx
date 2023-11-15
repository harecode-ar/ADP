'use client'

import * as React from 'react'
import { Container, Button, Link } from '@mui/material'
import NextLink from 'next/link'
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
      <CustomBreadcrumbs
        heading="Proyectos"
        links={[{ name: 'Proyectos', href: paths.dashboard.project.root }, { name: 'Listado' }]}
        action={
          <Link href={paths.dashboard.project.new} component={NextLink}>
            <Button variant="contained">
              <Iconify icon="mingcute:add-fill" mr={1} />
              Nuevo
            </Button>
          </Link>
        }
      />
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  )
}
