import React, { useState } from 'react'
import { Task, ViewMode, Gantt } from 'gantt-task-react'
import { Box, Card } from '@mui/material'
import { GREY } from 'src/theme/palette'
import { useTheme, alpha } from '@mui/material/styles'
import { ViewSwitcher } from './view-switcher'
import TaskTooltip from './task-tooltip'
import 'gantt-task-react/dist/index.css'
import './index.css'

type TProps = {
  tasks: Task[]
}

const GanttComponent = (props: TProps) => {
  const theme = useTheme()
  const PRIMARY = theme.palette.primary
  const { mode } = theme.palette

  const { tasks } = props
  const [view, setView] = useState<ViewMode>(ViewMode.Day)
  let columnWidth = 65
  if (view === ViewMode.Year) {
    columnWidth = 350
  } else if (view === ViewMode.Month) {
    columnWidth = 300
  } else if (view === ViewMode.Week) {
    columnWidth = 250
  }

  const handleClick = (task: Task) => {
    console.log('etapa seleccionada: ', task.id)
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
          tasks={tasks}
          viewMode={view}
          locale="es"
          listCellWidth=""
          columnWidth={columnWidth}
          onClick={handleClick}
          TooltipContent={TaskTooltip}
        />
      </Box>
    </Card>
  )
}

export default GanttComponent
