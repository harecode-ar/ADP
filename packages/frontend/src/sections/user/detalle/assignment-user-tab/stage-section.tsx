import { IStage } from '@adp/shared'
import React from 'react'
import { Box, Typography } from '@mui/material'
import AssignmentItem from './assignment-item'

type TProps = {
  stages: IStage[]
}

export default function StageSection(props: TProps) {
  const { stages } = props

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Etapas
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
        {stages.map((stage) => (
          <AssignmentItem key={stage.id} stage={stage} />
        ))}
      </Box>
      {stages.length === 0 && (
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
