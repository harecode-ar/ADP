'use client'

import { IChecklist } from '@adp/shared'
import React from 'react'
import { Typography, Box, IconButton, Stack, MenuItem, Tooltip } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
import { useTheme } from '@mui/material/styles'
import ModalDelete from './modal-delete'
import UpdateChecklistModal from './checklist-update-modal'

type TProps = {
  checklist: IChecklist
  refetch: () => void
}

const MAX_CHARACTERS = 33

export function ChecklistItem(props: TProps) {
  const { checklist, refetch } = props
  const { checks = [] } = checklist
  const theme = useTheme()
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Tooltip title={checklist.title.length > MAX_CHARACTERS ? checklist.title : ''}>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration:
                      checklist.finished && checklist.checks.length ? 'line-through' : 'none',
                  }}
                >
                  {checklist.title.length > MAX_CHARACTERS
                    ? `${checklist.title.slice(0, MAX_CHARACTERS)}...`
                    : checklist.title}
                </Typography>
              </Tooltip>
            </Box>

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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {checklist.finished && checklist.checks.length ? (
                  <Iconify icon="eva:done-all-fill" color={theme.palette.success.main} />
                ) : (
                  <Iconify icon="eva:done-all-fill" color={theme.palette.text.disabled} />
                )}
                <Typography
                  sx={{
                    color:
                      checklist.finished && checklist.checks.length
                        ? theme.palette.success.main
                        : theme.palette.text.disabled,
                    fontSize: '14px',
                  }}
                >
                  {`${completedChecks.toString().padStart(2, '0')}/${totalChecks
                    .toString()
                    .padStart(2, '0')}`}
                </Typography>
              </Box>
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
