import { IProject, IStage } from '@adp/shared'
import React, { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import AssignmentItem from './assignment-item'

type TProps = {
  projects: IProject[]
  stages: IStage[]
  subStages: IStage[]
}

export default function AssignmentSection(props: TProps) {
  const { projects, stages, subStages } = props

  const length = useMemo(
    () => projects.length + stages.length + subStages.length,
    [projects, stages, subStages]
  )

  return (
    <Box>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
      >
        {projects.map((project) => (
          <AssignmentItem key={project.id} project={project} />
        ))}
        {stages.map((stage) => (
          <AssignmentItem key={stage.id} stage={stage} />
        ))}
        {subStages.map((subStage) => (
          <AssignmentItem key={subStage.id} subStage={subStage} />
        ))}
      </Box>
      {length === 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography>No se encontraron resultados</Typography>
        </Box>
      )}
    </Box>
  )
}
