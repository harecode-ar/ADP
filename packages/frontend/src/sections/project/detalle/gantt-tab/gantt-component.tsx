import React from 'react'
import { Task } from 'gantt-task-react'
import { Card } from '@mui/material'
import Gantt, { useGantt } from 'src/components/gantt'
import { ViewSwitcher } from './view-switcher'
import TaskTooltip from './task-tooltip'

type TProps = {
  tasks: Task[]
}

const GanttComponent = (props: TProps) => {
  const { tasks } = props

  const { viewOption, handleChangeView } = useGantt()

  const handleClick = (task: Task) => {
    console.log('etapa seleccionada: ', task.id)
  }

  return (
    <Card sx={{ p: 3 }}>
      <ViewSwitcher viewOption={viewOption} handleChangeView={handleChangeView} />
      <Gantt
        tasks={tasks}
        viewOption={viewOption}
        onClick={handleClick}
        TooltipContent={TaskTooltip}
      />
    </Card>
  )
}

export default GanttComponent
