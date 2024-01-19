import { IProject, IStage, TASK_STATE } from '@adp/shared'
import React from 'react'
import { Box, Button, Card, Typography } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import ModalCreate from './create-stage'
import KanbanComponent from './kanban/view/kanban-view'

type TProps = {
  project: IProject
  stages: IStage[]
  refetch: VoidFunction
}

export default function StagesTab(props: TProps) {
  const { project, stages, refetch } = props

  const modalCreate = useBoolean()

  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {project && project.stateId !== TASK_STATE.COMPLETED && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={modalCreate.onTrue}
              sx={{ width: 'fit-content' }}
            >
              <Iconify icon="mingcute:add-fill" mr={1} />
              Crear etapa
            </Button>
          </Box>
        )}
        {stages.length > 0 && <KanbanComponent stages={stages} project={project} refetch={refetch} />}
        {modalCreate.value && (
          <ModalCreate modal={modalCreate} project={project} refetch={refetch} />
        )}
        {stages.length === 0 && (
          <Typography
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: 2,
            }}
          >
            No hay etapas asignadas a este proyecto
          </Typography>
        )}
      </Box>
    </Card>
  )
}
