import { IStage, ITaskState, TASK_STATE, TASK_STATE_ARRAY } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Task } from 'gantt-task-react'
import { Card, Box, Autocomplete, TextField, Typography } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_STAGES_BY_PROJECT } from 'src/graphql/queries'
import Gantt, { useGantt } from 'src/components/gantt'
import { ViewSwitcher } from './view-switcher'
import TaskTooltip from './task-tooltip'

type TProps = {
  tasks: Task[]
  handleProjectStateChange: (a: any, b: any) => void
  projectState: any
}

const ALL_STATE = {
  id: 0,
  name: 'Todos',
} as ITaskState

const GanttComponent = (props: TProps) => {
  const { tasks, handleProjectStateChange, projectState } = props
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
      .filter((stage) => stage.stateId !== TASK_STATE.CANCELLED)
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

  const emptyMessage = useMemo(() => {
    if (projectState[0].id === 0) {
      return 'No hay proyectos en esta area.'
    }
    return 'No hay proyectos en ese estado en esta area.'
  }, [projectState])

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Autocomplete
          multiple
          sx={{ minWidth: 170, marginBottom: '16px' }}
          options={[ALL_STATE, ...TASK_STATE_ARRAY] as ITaskState[]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Estado" />}
          noOptionsText="No hay estados"
          value={projectState}
          onChange={handleProjectStateChange}
          clearIcon={null}
        />
        <ViewSwitcher viewOption={viewOption} handleChangeView={handleChangeView} />
      </Box>
      {tasks.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            marginTop: '16px',
          }}
        >
          <Typography>{emptyMessage}</Typography>
        </Box>
      ) : (
        <Gantt
          tasks={combinedTasks}
          viewOption={viewOption}
          onDoubleClick={handleDoubleClick}
          TooltipContent={TaskTooltip}
        />
      )}
    </Card>
  )
}

export default GanttComponent
