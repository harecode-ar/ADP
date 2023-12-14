import { IStage } from '@adp/shared'
import React from 'react'
import { Box, Typography } from '@mui/material'
import AssignmentItem from './assignment-item'

type TProps = {
  subStages: IStage[]
}

export default function SubStageSection(props: TProps) {
  const { subStages } = props

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sub Etapas
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
        {subStages.map((subStage) => (
          <AssignmentItem key={subStage.id} subStage={subStage} />
        ))}
      </Box>
      {subStages.length === 0 && (
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
