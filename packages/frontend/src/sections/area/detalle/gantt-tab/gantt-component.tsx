import { IStage, STAGE_STATE } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Task, ViewMode, Gantt } from 'gantt-task-react'
import { Box, Card } from '@mui/material'
import { GREY } from 'src/theme/palette'
import { useQuery } from '@apollo/client'
import { GET_STAGES_BY_PROJECT } from 'src/graphql/queries'
import { useTheme, alpha } from '@mui/material/styles'
import { ViewSwitcher } from './view-switcher'
import TaskTooltip from './task-tooltip'
import 'gantt-task-react/dist/index.css'
import './index.css'

type TProps = {
  tasks: Task[]
}

const GanttComponent = (props: TProps) => {
  const { tasks } = props
  const [view, setView] = useState<ViewMode>(ViewMode.Day)
  const [expanded, setExpanded] = useState<string | null>(null)
  const theme = useTheme()

  const stageQuery = useQuery(GET_STAGES_BY_PROJECT, {
    variables: { projectId: Number(expanded) },
    skip: !expanded,
  })

  const stages: IStage[] = useMemo(() => {
    if (!stageQuery.data) return []
    return stageQuery.data.stagesByProject
  }, [stageQuery.data])

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

  const combinedTasks: Task[] = [
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

  const PRIMARY = theme.palette.primary
  const { mode } = theme.palette

  let columnWidth = 65
  if (view === ViewMode.Year) {
    columnWidth = 350
  } else if (view === ViewMode.Month) {
    columnWidth = 300
  } else if (view === ViewMode.Week) {
    columnWidth = 250
  }

  const handleDoubleClick = (task: Task) => {
    if (task.type === 'project') {
      setExpanded(task.id === expanded ? null : task.id)
    }
  }

  const isDark = mode === 'dark'
  return (
    <Card sx={{ p: 3 }}>
      <Box className={`gantt-container ${mode}`}>
        <ViewSwitcher onViewModeChange={(viewMode) => setView(viewMode)} />
        <Gantt
          projectBackgroundColor={isDark ? PRIMARY.main : PRIMARY.main}
          projectBackgroundSelectedColor={isDark ? PRIMARY.dark : PRIMARY.dark}
          barProgressColor={isDark ? PRIMARY.main : PRIMARY.main}
          barProgressSelectedColor={isDark ? PRIMARY.dark : PRIMARY.dark}
          barBackgroundColor={isDark ? GREY[600] : GREY[500]}
          barBackgroundSelectedColor={isDark ? GREY[700] : GREY[600]}
          todayColor={alpha(PRIMARY.lighter, isDark ? 0.15 : 0.35)}
          tasks={combinedTasks}
          viewMode={view}
          locale="es"
          listCellWidth=""
          columnWidth={columnWidth}
          TooltipContent={TaskTooltip}
          onDoubleClick={handleDoubleClick}
        />
      </Box>
    </Card>
  )
}

export default GanttComponent
