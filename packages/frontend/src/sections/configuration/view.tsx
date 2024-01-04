'use client'

import React from 'react'
import {
  Box,
  Container
} from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { paths } from 'src/routes/paths'
import { usePrint } from 'src/hooks/use-print'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs'
import { TableContextProvider } from 'src/components/table/context'
import Table from './table'

export default function ConfigurationView() {
  const [ref] = usePrint()
  const settings = useSettingsContext()
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} ref={ref}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CustomBreadcrumbs
          heading="Configuración"
          links={[{ name: 'Tablero', href: paths.dashboard.root }, { name: 'Configuración' }]}
          action={null}
        />

        <TableContextProvider>
          <Table />
        </TableContextProvider>

      </Box>
    </Container>
  )
}
