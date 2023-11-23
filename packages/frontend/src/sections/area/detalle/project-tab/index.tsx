import { IProject } from '@adp/shared'
import { Box } from '@mui/material'
import React from 'react'
import ProjectLine from './project-line'

type TProps = {
  projects: IProject[]
}

export default function ProjectTab(props: TProps) {
  const { projects } = props

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {projects.map((project) => (
        <ProjectLine key={project.id} project={project} />
      ))}
    </Box>
  )
}
