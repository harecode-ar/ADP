import { IStage } from '@adp/shared'
import React from 'react'
import { Stack, Box, Avatar, PaperProps, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
import { ERROR, INFO, WARNING } from 'src/theme/palette'
import { getStorageFileUrl } from 'src/utils/storage'
import KanbanDetails from './kanban-details'

// ----------------------------------------------------------------------

type Props = PaperProps & {
  stage: IStage
  subStageItem: IStage
  refetch: () => void
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

export default function KanbansubStageItemItem({
  subStageItem,
  stage,
  sx,
  refetch,
  ...other
}: Props) {
  const theme = useTheme()

  const color = getColor(subStageItem.progress)

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
          <Typography variant="subtitle2">{subStageItem.name}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">
              {subStageItem.responsible?.fullname || 'Sin asignar'}
            </Typography>
            <Avatar
              src={
                subStageItem.responsible
                  ? getStorageFileUrl(subStageItem.responsible.image, '/broken-image.jpg')
                  : '/broken-image.jpg'
              }
              sx={{ width: 35, height: 35, border: `solid 2px ${color}` }}
            />
          </Box>

          <Iconify
            icon={
              (subStageItem.progress <= 0.3 && 'solar:double-alt-arrow-down-bold-duotone') ||
              (subStageItem.progress > 0.3 &&
                subStageItem.progress <= 0.6 &&
                'solar:double-alt-arrow-right-bold-duotone') ||
              'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              ...(subStageItem.progress >= 0.6 && {
                color: 'info.main',
              }),
              ...(subStageItem.progress > 0.3 &&
                subStageItem.progress <= 0.6 && {
                  color: 'warning.main',
                }),
              ...(subStageItem.progress <= 0.3 && {
                color: 'error.main',
              }),
            }}
          />
        </Stack>
      </Paper>
      {openDetails.value && (
        <KanbanDetails
          refetch={refetch}
          stage={stage}
          subStageItem={subStageItem}
          openDetails={openDetails.value}
          onCloseDetails={openDetails.onFalse}
        />
      )}
    </React.Fragment>
  )
}
