import { IArea } from '@adp/shared'
import { Box } from '@mui/material'
import React from 'react'

type TProps = {
  areas: IArea[]
}

export default function OrganigramaTab(props: TProps) {
  const { areas } = props

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
      {/* {projects.map((project) => (
        <ProjectLine key={project.id} project={project} />
      ))} */}
    </Box>
  )
}
