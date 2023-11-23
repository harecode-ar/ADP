import { IProject } from '@adp/shared'
import React, { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import Iconify from 'src/components/iconify/iconify'
import StageSubLine from './stage-sub-line'
import StageLine from './stage-line'


type TProps = {
  project: IProject
}

export default function ProjectLine(props: TProps) {
  const { project } = props

  const [expanded, setExpanded] = useState(false)

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      <Typography>{project.name}</Typography>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 1
      }}>
        <IconButton onClick={() => setExpanded(!expanded)} size="small">
          <Iconify icon={expanded ? 'pajamas:chevron-down' : 'material-symbols:chevron-right-rounded'} width={25} height={25} />
        </IconButton>
        <Box sx={{
          width: '100%',
          borderRadius: 2,
          backgroundColor: 'primary.main',
          height: 35,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}>
          {project.stages.map((stage, index) => (
            <StageSubLine key={stage.id} project={project} stage={stage} first={index === 0} last={index === project.stages.length - 1} />
          ))}
        </Box>
      </Box>
      {
        expanded && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            {project.stages.map((stage) => (
              <Box key={stage.id} sx={{
                marginLeft: 6
              }}>
                <StageLine stage={stage} />
              </Box>
            ))}
          </Box>
        )
      }
    </Box>
  )
}