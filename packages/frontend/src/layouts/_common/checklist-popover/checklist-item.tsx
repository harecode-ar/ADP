'use client'

import { IChecklist } from '@adp/shared'
import React from 'react'
import { Typography, Box, IconButton, Stack, MenuItem } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
import ModalDelete from './modal-delete'
import UpdateChecklistModal from './checklist-update-modal'

type TProps = {
  checklist: IChecklist
  refetch: () => void
}

export function ChecklistItem(props: TProps) {
  const { checklist, refetch } = props
  const { checks = [] } = checklist
  const modalDelete = useBoolean()
  const modalUpdate = useBoolean()

  const totalChecks = checks.length
  const completedChecks = checks.filter((check) => check.checked).length
  return (
    <React.Fragment>
      <MenuItem onClick={modalUpdate.onTrue}>
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
              {new Date(Number(checklist.createdAt)).toLocaleDateString()}
              {checklist?.project?.name || 'Sin asignar'}
            </Stack>
          </Box>

          <Box>
            <IconButton
              color="error"
              onClick={(event) => {
                event.stopPropagation()
                modalDelete.onTrue()
              }}
            >
              <Iconify icon="material-symbols:delete" />
            </IconButton>
          </Box>
        </Box>
      </MenuItem>
      {modalDelete.value && (
        <ModalDelete modal={modalDelete} checklistId={Number(checklist.id)} refetch={refetch} />
      )}
      {modalUpdate.value && (
        <UpdateChecklistModal modal={modalUpdate} refetch={refetch} checklist={checklist} />
      )}
    </React.Fragment>
  )
}
