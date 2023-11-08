import { IProject } from '@adp/shared'
import React from 'react'
import { Typography, Box, IconButton } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import ModalCreate from './create-stage'

type TProps = {
  project: IProject
}

export default function StagesTab(props: TProps) {
  const { project } = props

  const modalCreate = useBoolean()

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4">
          Crear etapas
        </Typography>
        <IconButton onClick={modalCreate.onTrue}>
          <Iconify icon="mingcute:add-fill" />
        </IconButton>
      </Box>
      {modalCreate.value && <ModalCreate modal={modalCreate} project={project}/>}
    </Box>
  )
}
