'use client'

import { IChecklist } from '@adp/shared'
import React from 'react'
import { Typography, Box, IconButton, Stack, MenuItem, Tooltip } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import Iconify from 'src/components/iconify'
import { useTheme } from '@mui/material/styles'
import { UPDATE_REMEMBER_CHECKLIST } from 'src/graphql/mutations'
import { useMutation } from '@apollo/client'
import { ECustomEvent } from 'src/types'
import { dispatchCustomEvent } from 'src/utils/custom-event'
import ModalDeleteTab from './modal-delete-tab'
import UpdateChecklistModalTab from './checklist-update-modal-tab'

type TProps = {
  checklist: IChecklist
  refetch: () => void
}

const MAX_CHARACTERS_TITLE = 30

export function ChecklistItemTab(props: TProps) {
  const { checklist, refetch } = props
  const { checks = [] } = checklist
  const theme = useTheme()
  const modalDelete = useBoolean()
  const modalUpdate = useBoolean()

  const totalChecks = checks.length
  const completedChecks = checks.filter((check) => check.checked).length

  const [updateRememberChecklist] = useMutation(UPDATE_REMEMBER_CHECKLIST)

  const rememberChecklist = async () => {
    await updateRememberChecklist({
      variables: {
        id: checklist.id,
        remember: !checklist.remember,
      },
    })
    refetch()
    dispatchCustomEvent(ECustomEvent.refetchUserChecklist)
  }

  return (
    <React.Fragment>
      <MenuItem onClick={modalUpdate.onTrue} sx={{ bgcolor: 'background.neutral' }}>
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
              <Tooltip title={checklist.title}>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration:
                      checklist.finished && checklist.checks.length ? 'line-through' : 'none',
                  }}
                >
                  {checklist.title.length > MAX_CHARACTERS_TITLE
                    ? `${checklist.title.slice(0, MAX_CHARACTERS_TITLE)}...`
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
            </Stack>
          </Box>

          <Box>
            <Tooltip
              title={checklist.remember ? 'Desactivar recordatorio' : 'Activar recordatorio'}
            >
              <IconButton
                onClick={(event) => {
                  event.stopPropagation()
                  rememberChecklist()
                }}
              >
                {checklist.remember ? (
                  <Iconify icon="mdi:bell-ring" />
                ) : (
                  <Iconify icon="mdi:bell-outline" />
                )}
              </IconButton>
            </Tooltip>
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
        <ModalDeleteTab modal={modalDelete} checklistId={Number(checklist.id)} refetch={refetch} />
      )}
      {modalUpdate.value && (
        <UpdateChecklistModalTab modal={modalUpdate} refetch={refetch} checklist={checklist} />
      )}
    </React.Fragment>
  )
}
