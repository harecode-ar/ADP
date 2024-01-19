import { IStage } from '@adp/shared'
import React from 'react'
import { Box, Button, Card, Typography } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import ModalCreate from './create-sub-stage'
import KanbanComponent from './kanban/view/kanban-view'

type TProps = {
  stage: IStage
  subStages: IStage[]
  refetch: VoidFunction
}

export default function SubStagesTab(props: TProps) {
  const { stage, subStages, refetch } = props

  const modalCreate = useBoolean()

  return (
    <Card sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
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
            Crear Sub-etapa
          </Button>
        </Box>
        {subStages.length > 0 && (
          <KanbanComponent subStages={subStages} stage={stage} refetch={refetch} />
        )}
        {modalCreate.value && <ModalCreate modal={modalCreate} stage={stage} refetch={refetch} />}
        {subStages.length === 0 && (
          <Typography
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: 2,
            }}
          >
            No hay sub etapas asignadas a esta etapa
          </Typography>
        )}
      </Box>
    </Card>
  )
}
