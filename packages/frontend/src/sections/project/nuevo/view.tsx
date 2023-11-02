'use client'

import * as React from 'react'
import { Container } from '@mui/material'
import { useSettingsContext } from 'src/components/settings'
import CreateProject from './create-project'

// ----------------------------------------------------------------------

export default function NewProjectView() {
  const settings = useSettingsContext()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CreateProject />
    </Container>
  )
}
