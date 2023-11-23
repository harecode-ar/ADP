'use client'

import { IStage } from '@adp/shared'
import { Stack, Box } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import { DragDropContext } from '@hello-pangea/dnd'
import KanbanColumn from './kanban-column'

// ----------------------------------------------------------------------

type TProps = {
  subStages: IStage[]
  stage: IStage
  refetch: VoidFunction
}

export default function KanbanComponent(props: TProps) {
  const { subStages, stage, refetch } = props

  const subStagesByState: Record<string, IStage[]> = {
    Nuevo: [],
    'En progreso': [],
    Completado: [],
    Cancelado: [],
  }

  subStages?.forEach((subStage) => subStagesByState[subStage.state.name].push(subStage))

  return (
    <Box>
      <DragDropContext onDragEnd={() => null}>
        <Scrollbar
          sx={{
            height: 1,
            minHeight: {
              xs: '80vh',
              md: 'unset',
            },
          }}
        >
          <Stack
            spacing={3}
            direction="row"
            alignItems="flex-start"
            sx={{
              p: 0.25,
              height: 1,
            }}
          >
            {/* <KanbanColumn stage={stages} title="Etapas de Proyecto" /> */}
            {Object.entries(subStagesByState).map(([state, stateSubStages]) => (
              <KanbanColumn
                subStages={stateSubStages}
                stage={stage}
                title={state}
                refetch={refetch}
              />
            ))}
          </Stack>
        </Scrollbar>
      </DragDropContext>
    </Box>
  )
}
