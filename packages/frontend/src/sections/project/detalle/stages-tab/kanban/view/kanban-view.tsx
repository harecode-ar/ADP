'use client'

import { IStage, IProject } from '@adp/shared'
import { Box } from '@mui/material'
import Scrollbar from 'src/components/scrollbar'
import { DragDropContext } from '@hello-pangea/dnd'
import KanbanColumn from './kanban-column'

// ----------------------------------------------------------------------

type TProps = {
  stages: IStage[]
  project: IProject
  refetch: VoidFunction
}

export default function KanbanComponent(props: TProps) {
  const { stages, project, refetch } = props

  const stagesByState: Record<string, IStage[]> = {
    Nuevo: [],
    'En espera': [],
    'En progreso': [],
    Completado: [],
    Cancelado: [],
  }

  stages.forEach((stage) => stagesByState[stage.state.name].push(stage))

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
          <Box gap={3} display="grid" gridTemplateColumns="repeat(4, 1fr)">
            {/* <KanbanColumn stage={stages} title="Etapas de Proyecto" /> */}
            {Object.entries(stagesByState).map(([state, stateStages]) => (
              <KanbanColumn stage={stateStages} project={project} title={state} refetch={refetch} />
            ))}
          </Box>
        </Scrollbar>
      </DragDropContext>
    </Box>
  )
}
