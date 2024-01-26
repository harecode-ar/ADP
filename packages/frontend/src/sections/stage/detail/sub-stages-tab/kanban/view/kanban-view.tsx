'use client'

import { IStage } from '@adp/shared'
import { Box } from '@mui/material'
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
    'En espera': [],
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
          <Box gap={3} display="grid" gridTemplateColumns="repeat(5, 1fr)">
            {Object.entries(subStagesByState).map(([state, stateSubStages]) => (
              <KanbanColumn
                subStages={stateSubStages}
                stage={stage}
                title={state}
                refetch={refetch}
              />
            ))}
          </Box>
        </Scrollbar>
      </DragDropContext>
    </Box>
  )
}
