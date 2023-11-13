import { IStage } from '@adp/shared'
import React from 'react'
import { Stack, Box, Avatar, LinearProgress, PaperProps, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
import { ERROR, INFO, WARNING } from 'src/theme/palette'
import KanbanDetails from './kanban-details'

// ----------------------------------------------------------------------

type Props = PaperProps & {
  task: IStage
  refetch: () => void
}

const getColorVariant = (progress: number) => {
  if (progress >= 0.6) {
    return 'info'
  }
  if (progress > 0.3 && progress <= 0.6) {
    return 'warning'
  }
  return 'error'
}

const getColor = (progress: number) => {
  if (progress >= 0.6) {
    return INFO.main
  }
  if (progress > 0.3 && progress <= 0.6) {
    return WARNING.main
  }
  return ERROR.main
}

export default function KanbanTaskItem({ task, sx, refetch, ...other }: Props) {
  const theme = useTheme()

  const hasUser = Boolean(task.responsible)
  const color = getColor(task.progress)

  const openDetails = useBoolean()

  return (
    <React.Fragment>
      <Paper
        onClick={openDetails.onTrue}
        sx={{
          width: 1,
          borderRadius: 1.5,
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
          cursor: 'pointer',
          boxShadow: theme.customShadows.z1,
          '&:hover': {
            boxShadow: theme.customShadows.z20,
          },
          ...(openDetails.value && {
            boxShadow: theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
          <Typography variant="subtitle2">{task.name}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">
              {task.responsible?.fullname || 'Sin asignar'}
            </Typography>
            <Avatar
              src={
                hasUser
                  ? 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
                  : '/broken-image.jpg'
              }
              sx={{ width: 35, height: 35, border: `solid 2px ${color}` }}
            />
          </Box>

          <Iconify
            icon={
              (task.progress <= 0.3 && 'solar:double-alt-arrow-down-bold-duotone') ||
              (task.progress > 0.3 &&
                task.progress <= 0.6 &&
                'solar:double-alt-arrow-right-bold-duotone') ||
              'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              ...(task.progress >= 0.6 && {
                color: 'info.main',
              }),
              ...(task.progress > 0.3 &&
                task.progress <= 0.6 && {
                color: 'warning.main',
              }),
              ...(task.progress <= 0.3 && {
                color: 'error.main',
              }),
            }}
          />
          <LinearProgress
            variant="determinate"
            value={task.progress * 100}
            color={getColorVariant(task.progress)}
          />
          <Typography variant="subtitle2"> {task.progress * 100}%</Typography>
        </Stack>
      </Paper>
      <KanbanDetails
        refetch={refetch}
        stage={task}
        openDetails={openDetails.value}
        onCloseDetails={openDetails.onFalse}
      />
    </React.Fragment>
  )
}
