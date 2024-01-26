import { IStage, IProject } from '@adp/shared'
import React from 'react'
import { Stack, Box, PaperProps, Paper, Typography, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
import { colorFromAcpOrPacp, getTootipFromAcpOrPacp } from 'src/utils/average-completition'
import { fDate } from 'src/utils/format-time'
import KanbanDetails from './kanban-details'

// ----------------------------------------------------------------------

type Props = PaperProps & {
  project: IProject
  task: IStage
  refetch: () => void
}

export default function KanbanTaskItem({ project, task, sx, refetch, ...other }: Props) {
  const theme = useTheme()

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
        <Stack spacing={2} sx={{ px: 2, py: 2, position: 'relative', minWidth: 280 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">{task.name}</Typography>
            {task.hasStages && (
              <Tooltip title="Tiene subetapas">
                <Iconify icon="clarity:folder-line" width={16} sx={{ color: 'text.disabled' }} />
              </Tooltip>
            )}
          </Stack>

          <Box
            sx={{
              mt: -2,
              mb: -1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'caption', color: 'text.disabled' }}
              divider={
                <Box
                  sx={{
                    width: 2,
                    height: 2,
                    bgcolor: 'currentColor',
                    mx: 0.5,
                    borderRadius: '50%',
                  }}
                />
              }
            >
              {task.area?.name || 'Sin area'}
              {task.responsible?.fullname || 'Sin asignar'}
            </Stack>
          </Box>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              <Tooltip title={getTootipFromAcpOrPacp(task.acp ?? null, task.pacp ?? null)}>
                <Box
                  sx={{
                    backgroundColor: colorFromAcpOrPacp(task.acp ?? null, task.pacp ?? null),
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    marginRight: 1,
                  }}
                />
              </Tooltip>
              {(task.progress * 100).toFixed(0)}%
            </Stack>
            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify icon="clarity:date-line" width={16} sx={{ mr: 1 }} />
                <Stack alignItems="center">
                  {fDate(new Date(task.startDate))} - {fDate(new Date(task.endDate))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      {openDetails.value && (
        <KanbanDetails
          refetch={refetch}
          project={project}
          stageId={task.id}
          openDetails={openDetails.value}
          onCloseDetails={openDetails.onFalse}
        />
      )}
    </React.Fragment>
  )
}
