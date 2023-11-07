import React from 'react'
import { Task } from 'gantt-task-react'
import { Box, Card } from '@mui/material'

import 'gantt-task-react/dist/index.css'

type TProps = {
  task: Task
}

const TaskTooltip = (props: TProps) => {
  const { task } = props

  const difference = task.end.getTime() - task.start.getTime()
  const duration = Math.floor(difference / (1000 * 60 * 60 * 24))

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div>Nombre: {task.name}</div>
        <div>Progreso: {task.progress}%</div>
        <div>
          Duracion: {duration} {duration === 1 ? 'dia' : 'dias'}
        </div>
      </Box>
    </Card>
  )
}

export default TaskTooltip
