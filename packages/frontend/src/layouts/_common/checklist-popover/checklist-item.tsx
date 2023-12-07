import React from 'react'
import { Typography, Box, IconButton, Stack, MenuItem } from '@mui/material'
import Iconify from 'src/components/iconify'
import { IChecklist } from '@adp/shared'

type TProps = {
  checklist: IChecklist
}

export function ChecklistItem(props: TProps) {
  const { checklist } = props
  const { checks = [] } = checklist
  
  const totalChecks = checks.length
  const completedChecks = checks.filter((check) => check.checked).length
  return (
    <MenuItem>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {checklist.title}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', fontSize: '14px' }}
            divider={
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  bgcolor: 'currentColor',
                  mx: 0.8,
                  borderRadius: '50%',
                }}
              />
            }
          >
            {`${completedChecks.toString().padStart(2, '0')}/${totalChecks
              .toString()
              .padStart(2, '0')}`}
            {checklist.createdAt.split('T')[0].split('-').reverse().join('/')}
            {checklist?.project?.name || 'Sin asignar'}
          </Stack>
        </Box>

        <Box>
          <IconButton color="error" onClick={() => null}>
            <Iconify icon="material-symbols:delete" />
          </IconButton>
        </Box>
      </Box>
    </MenuItem>
  )
}
