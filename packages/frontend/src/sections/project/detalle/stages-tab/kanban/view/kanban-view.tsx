'use client'

import { IStage } from '@adp/shared'
import { Stack, Box } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import { DragDropContext } from '@hello-pangea/dnd'
import { STAGES_MOCK } from 'src/mocks/stage'
import KanbanColumn from './kanban-column'

// ----------------------------------------------------------------------


export default function KanbanComponent() {
  const stages = STAGES_MOCK as IStage[]


  const stagesByState: Record<string, IStage[]> = {
    'Pendiente': [],
    'En Progreso': [],
    'Finalizada': [],
    'Cancelada': [],
  };

  stages.forEach((stage) => stagesByState[stage.state.name].push(stage));

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
            {Object.entries(stagesByState).map(([state, stateStages]) => (
              <KanbanColumn stage={stateStages} title={state} />
            ))}


          </Stack>
        </Scrollbar>
      </DragDropContext>
    </Box>
  )
}
