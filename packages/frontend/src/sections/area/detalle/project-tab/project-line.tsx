import { IProject } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import NextLink from 'next/link'
import { useResponsive } from 'src/hooks/use-responsive'
import { Box, Typography, IconButton, Link, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify/iconify'
import { paths } from 'src/routes/paths'
import {
  getColorFromAcp,
  getColorFromPacp,
  getTooltipFromAcp,
  getTooltipFromPacp,
} from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'
import StageSubLine from './stage-sub-line'
import StageLine from './stage-line'

type TProps = {
  project: IProject
}

const colorFromAcpOrPacp = (proj: IProject) => {
  if (proj.acp === null) {
    return getColorFromPacp(proj.pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getColorFromAcp(proj.acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

const getTootipFromAcpOrPacp = (acp: number | null, pacp: number | null) => {
  if (acp === null) {
    return getTooltipFromPacp(pacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
  }
  return getTooltipFromAcp(acp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
}

export default function ProjectLine(props: TProps) {
  const { project } = props

  const [expanded, setExpanded] = useState(false)

  const isMobile = useResponsive('down', 'sm')

  const hasStages = useMemo(() => project.stages.length > 0, [project.stages])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <Tooltip title={getTootipFromAcpOrPacp(project.acp ?? null, project.pacp ?? null)}>
          <Box
            sx={{
              height: 15,
              width: 15,
              borderRadius: '50%',
              backgroundColor: colorFromAcpOrPacp(project),
            }}
          />
        </Tooltip>
        <Typography
          sx={{
            fontSize: '18px',
            textAlign: 'center',
            flex: isMobile ? 1 : null,
          }}
        >
          {project.name}
        </Typography>

        <Link
          component={NextLink}
          href={paths.dashboard.project.detail.replace(':id', String(project.id))}
        >
          <IconButton size="small">
            <Iconify icon="mdi:eye" width={15} height={15} />
          </IconButton>
        </Link>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <IconButton onClick={() => setExpanded(!expanded)} size="small" disabled={!hasStages}>
          <Iconify
            icon={expanded ? 'pajamas:chevron-down' : 'material-symbols:chevron-right-rounded'}
            width={25}
            height={25}
          />
        </IconButton>
        <Box
          sx={{
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'grey.700',
            height: 35,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflow: 'hidden',
          }}
        >
          {expanded &&
            project.stages.map((stage, index) => (
              <StageSubLine
                key={stage.id}
                project={project}
                stage={stage}
                first={index === 0}
                last={index === project.stages.length - 1}
              />
            ))}
          {!expanded && (
            <Box
              sx={(theme) => ({
                width: '100%',
                backgroundColor: theme.palette.mode === 'dark' ? 'grey.700' : 'grey.300',
                height: 35,
                borderRadius: 2,
                position: 'relative',
              })}
            >
              <Box
                sx={{
                  width: `${project.progress * 100}%`,
                  backgroundColor: colorFromAcpOrPacp(project),
                  height: 35,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 0,
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    lineHeight: '35px',
                    textShadow: '0px 0px 2px rgba(0,0,0,0.5)',
                    fontSize: '18px',
                  }}
                >
                  {project.progress * 100}%
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {expanded && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 1,
          }}
        >
          {project.stages.map((stage) => (
            <Box
              key={stage.id}
              sx={{
                width: '90%',
                marginLeft: '44px',
              }}
            >
              <StageLine stage={stage} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
