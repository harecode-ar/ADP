import { IProject } from '@adp/shared'
import React from 'react'
import { Box, Typography } from '@mui/material'
import AssignmentItem from './assignment-item'

type TProps = {
  projects: IProject[]
}

export default function ProjectSection(props: TProps) {
  const { projects } = props

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Proyectos
      </Typography>
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
      </Box>
      {projects.length === 0 && (
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
