import { IStage } from '@adp/shared'
import React from 'react'
import { Stack, Box, PaperProps, Paper, Typography, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useBoolean } from 'src/hooks/use-boolean'
import { useConfigurationContext } from 'src/contexts/configuration-context'
import { colorFromAcpOrPacp, getTootipFromAcpOrPacp } from 'src/utils/average-completition'
import { fDate } from 'src/utils/format-time'
import Iconify from 'src/components/iconify'
import KanbanDetails from './kanban-details'

// ----------------------------------------------------------------------

type Props = PaperProps & {
  stage: IStage
  subStageItem: IStage
  refetch: () => void
}

export default function KanbansubStageItemItem({
  subStageItem,
  stage,
  sx,
  refetch,
  ...other
}: Props) {
  const theme = useTheme()
  const { stagePercentageAlertMargin } = useConfigurationContext()

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
          <Typography variant="subtitle2">{subStageItem.name}</Typography>
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
              {subStageItem.area?.name || 'Sin area'}
              {subStageItem.responsible?.fullname || 'Sin asignar'}
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
              <Tooltip
                title={getTootipFromAcpOrPacp(
                  subStageItem.acp ?? null,
                  subStageItem.pacp ?? null,
                  stagePercentageAlertMargin
                )}
              >
                <Box
                  sx={{
                    backgroundColor: colorFromAcpOrPacp(
                      subStageItem.acp ?? null,
                      subStageItem.pacp ?? null,
                      stagePercentageAlertMargin
                    ),
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    marginRight: 1,
                  }}
                />
              </Tooltip>
              {subStageItem.progress * 100}%
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
                  {fDate(new Date(subStageItem.startDate))} -{' '}
                  {fDate(new Date(subStageItem.endDate))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
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
