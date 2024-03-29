import { IProject, IStage } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box, Tooltip } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colorFromAcpOrPacp } from 'src/utils/average-completition'
import { useConfigurationContext } from 'src/contexts/configuration-context'

type TProps = {
  project: IProject
  stage: IStage
  first?: boolean
  last?: boolean
}

const getDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  const days = diff / (1000 * 60 * 60 * 24)
  return days
}

export default function StageSubLine(props: TProps) {
  const { project, stage, first, last } = props
  const { stagePercentageAlertMargin } = useConfigurationContext()

  const width = useMemo(() => {
    const stageDuration = getDuration(stage.startDate, stage.endDate) + 1
    const projectDuration = getDuration(project.startDate, project.endDate)
    return (stageDuration / projectDuration) * 100
  }, [project, stage])

  return (
    <Tooltip title={stage.name}>
      <Box
        sx={(theme) => ({
          width: `${width}%`,
          height: '100%',
          backgroundColor: colorFromAcpOrPacp(stage.acp, stage.pacp, stagePercentageAlertMargin),
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: alpha(
              colorFromAcpOrPacp(stage.acp, stage.pacp, stagePercentageAlertMargin),
              0.25
            ),
          },
          borderTop: 'none',
          borderBottom: 'none',
          borderLeft: first ? 'none' : `1px solid ${theme.palette.background.paper}`,
          borderRight: last ? 'none' : `1px solid ${theme.palette.background.paper}`,
        })}
      />
    </Tooltip>
  )
}
