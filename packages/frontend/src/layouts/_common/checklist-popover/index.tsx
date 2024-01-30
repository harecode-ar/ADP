'use client'

import { IChecklist } from '@adp/shared'
import { m } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import { IconButton, Stack, Typography, Divider, Drawer, Tooltip, Box, Badge } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useQuery } from '@apollo/client'
import { useRouter } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'
import { GET_USER_CHECKLISTS } from 'src/graphql/queries'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { ECustomEvent } from 'src/types'
import { ChecklistItem } from './checklist-item'
import CreateChecklistModal from './checklist-create-modal'

export default function ChecklistPopover() {
  const createChecklistModal = useBoolean()
  const drawer = useBoolean()
  const smUp = useResponsive('up', 'sm')
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const checklistQuery = useQuery(GET_USER_CHECKLISTS, {
    onCompleted: (d) => {
      if (!d.userChecklists) {
        enqueueSnackbar('Checklist no encontrado', { variant: 'error' })
        router.push(paths.dashboard.root)
      }
    },
  })

  const checklists: IChecklist[] = useMemo(() => {
    if (!checklistQuery.data) return []
    return checklistQuery.data.userChecklists || []
  }, [checklistQuery.data])

  const unfinishedChecklists: IChecklist[] = useMemo(() => {
    if (checklists === undefined) return []
    return checklists.filter((checklist) => !checklist.finished && checklist.remember)
  }, [checklists])

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (unfinishedChecklists.length > 0 && !initialized) {
      enqueueSnackbar('Tienes checklist sin terminar', {
        variant: 'warning',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
      setInitialized(true)
    }
  }, [unfinishedChecklists, initialized, enqueueSnackbar])

  useEffect(() => {
    window.addEventListener(ECustomEvent.refetchUserChecklist, checklistQuery.refetch)
    return () => window.removeEventListener(ECustomEvent.refetchUserChecklist, checklistQuery.refetch)
  }, [checklistQuery.refetch])

  return (
    <Box>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color="default"
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={unfinishedChecklists.length} color="error">
          <Iconify icon="fluent:note-add-16-filled" width={24} />
        </Badge>
      </IconButton>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Checklist
          </Typography>

          <Tooltip title="Crear nuevo checklist">
            <IconButton onClick={createChecklistModal.onTrue}>
              <Iconify icon="mdi:plus" />
            </IconButton>
          </Tooltip>

          {!smUp && (
            <IconButton onClick={drawer.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          )}
        </Stack>
        <Divider />

        <Stack
          sx={{
            p: 2.5,
          }}
          spacing={1}
        >
          {checklists.map((checklist) => (
            <ChecklistItem
              key={checklist.id}
              checklist={checklist}
              refetch={checklistQuery.refetch}
            />
          ))}
        </Stack>
      </Drawer>
      <CreateChecklistModal modal={createChecklistModal} refetch={checklistQuery.refetch} />
    </Box>
  )
}
