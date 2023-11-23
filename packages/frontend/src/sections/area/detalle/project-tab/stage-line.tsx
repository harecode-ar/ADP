import { IStage } from '@adp/shared'
import React from 'react'
import { Box, Typography } from '@mui/material'

type TProps = {
  stage: IStage
}

export default function StageLine(props: TProps) {
  const { stage } = props

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
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
          gap: 1,
        }}
      >
        <Typography>{stage.name}</Typography>
        <Box
          sx={{
            height: 15,
            width: 15,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
          }}
        />
      </Box>
      <Box
        sx={(theme) => ({
          width: '100%',
          backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.200',
          height: 35,
          borderRadius: 2,
        })}
      >
        <Box
          sx={{
            width: `${stage.progress * 100}%`,
            backgroundColor: 'primary.main',
            height: 35,
            borderRadius: 2,
            textAlign: 'center',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          top: 32,
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontWeight: 'bold',
            lineHeight: '35px',
            textShadow: '0px 0px 2px rgba(0,0,0,0.5)',
          }}
        >
          {stage.progress * 100}%
        </Typography>
      </Box>
    </Box>
  )
}