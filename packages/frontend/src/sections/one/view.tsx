'use client'

import { Container, Typography } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import { TableContextProvider } from 'src/components/table/context'
import Table from './table'

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page One </Typography>
      <TableContextProvider>
        <Table />
      </TableContextProvider>
    </Container>
  )
}
