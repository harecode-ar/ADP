import React, { useMemo } from 'react'
import { Task, ViewMode, Gantt } from 'gantt-task-react'
import { Box } from '@mui/material'
import { GREY } from 'src/theme/palette'
import { useTheme, alpha } from '@mui/material/styles'
import 'gantt-task-react/dist/index.css'
import './index.css'
import type { TViewOption } from './types'

type TProps = {
  tasks: Task[]
  viewOption: TViewOption
  onClick?: (task: Task) => void
  onDoubleClick?: (task: Task) => void
  TooltipContent?: React.FC<{
    task: Task
    fontSize: string
    fontFamily: string
  }>
}

const GanttComponent = (props: TProps) => {
  const theme = useTheme()
  const PRIMARY = theme.palette.primary
  const { mode } = theme.palette

  const { tasks, viewOption, TooltipContent, onClick, onDoubleClick } = props

  const columnWidth = useMemo(() => {
    if (viewOption.value === ViewMode.Year) return 350
    if (viewOption.value === ViewMode.Month) return 300
    if (viewOption.value === ViewMode.Week) return 250
    return 65
  }, [viewOption])

  const isDark = useMemo(() => mode === 'dark', [mode])

  return (
    <Box className={`gantt-container ${mode} ${PRIMARY.main.replace('#', 'c')}`}>
      <Gantt
        projectBackgroundColor={isDark ? PRIMARY.main : PRIMARY.main}
        projectBackgroundSelectedColor={isDark ? PRIMARY.dark : PRIMARY.dark}
        barProgressColor={isDark ? PRIMARY.main : PRIMARY.main}
        barProgressSelectedColor={isDark ? PRIMARY.dark : PRIMARY.dark}
        barBackgroundColor={isDark ? GREY[600] : GREY[500]}
        barBackgroundSelectedColor={isDark ? GREY[700] : GREY[600]}
        todayColor={alpha(PRIMARY.lighter, isDark ? 0.15 : 0.35)}
        tasks={tasks}
        viewMode={viewOption.value}
        locale="es"
        listCellWidth=""
        columnWidth={columnWidth}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        TooltipContent={TooltipContent}
      />
    </Box>
  )
}

export default GanttComponent
