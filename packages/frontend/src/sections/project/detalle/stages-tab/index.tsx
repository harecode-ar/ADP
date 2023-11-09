import { IProject } from '@adp/shared'
import React from 'react'
import { Box, Button } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import ModalCreate from './create-stage'
import KanbanComponent from './kanban/view/kanban-view'

type TProps = {
  project: IProject
}

export default function StagesTab(props: TProps) {
  const { project } = props

  const modalCreate = useBoolean()

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <Button variant="contained" color="primary" onClick={modalCreate.onTrue} sx={{ width: 'fit-content' }}>
        <Iconify icon="mingcute:add-fill" mr={1} />
        Crear etapa
      </Button>
      <KanbanComponent />
      {modalCreate.value && <ModalCreate modal={modalCreate} project={project} />}
    </Box>
  )
}
