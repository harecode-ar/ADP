import { IStage, STAGE_STATE } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Task } from 'gantt-task-react'
import { Card } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_STAGES_BY_PROJECT } from 'src/graphql/queries'
import Gantt, { useGantt } from 'src/components/gantt'
import { ViewSwitcher } from './view-switcher'
import TaskTooltip from './task-tooltip'

type TProps = {
  tasks: Task[]
}

const GanttComponent = (props: TProps) => {
  const { tasks } = props
  const { viewOption, handleChangeView } = useGantt()
  const [expanded, setExpanded] = useState<string | null>(null)

  const stageQuery = useQuery(GET_STAGES_BY_PROJECT, {
    variables: { projectId: Number(expanded) },
    skip: !expanded,
  })

  const stages: IStage[] = useMemo(() => {
    if (!stageQuery.data) return []
    return stageQuery.data.stagesByProject
  }, [stageQuery.data])

  const combinedTasks = useMemo(() => {
    const indexOfSelectedProject = tasks.findIndex(
      (task) => task.type === 'project' && task.id === expanded
    )

    const mappedStages: Task[] = stages
      .filter((stage) => stage.stateId !== STAGE_STATE.CANCELLED)
      .map((stage) => ({
        displayOrder: indexOfSelectedProject + 1,
        id: String(stage.id),
        name: String(stage.name),
        progress: stage.progress * 100,
        start: new Date(stage.startDate),
        end: new Date(stage.endDate),
        project: String(stage.projectId),
        type: 'task',
      }))

    return [
      ...tasks.slice(0, indexOfSelectedProject + 1),
      ...mappedStages,
      ...tasks.slice(indexOfSelectedProject + 1).map((task) => ({
        ...task,
        displayOrder: (task.displayOrder || 0) + mappedStages.length,
      })),
    ].map((task, index) => ({
      ...task,
      displayOrder: index + 1,
    }))
  }, [tasks, stages, expanded])

  const handleDoubleClick = (task: Task) => {
    if (task.type === 'project') {
      setExpanded(task.id === expanded ? null : task.id)
    }
  }

  return (
    <Card sx={{ p: 3 }}>
      <ViewSwitcher viewOption={viewOption} handleChangeView={handleChangeView} />
      <Gantt
        tasks={combinedTasks}
        viewOption={viewOption}
        onDoubleClick={handleDoubleClick}
        TooltipContent={TaskTooltip}
      />
    </Card>
  )
}

export default GanttComponent
