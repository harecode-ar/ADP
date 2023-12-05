import { m } from 'framer-motion'
import React from 'react'
import { IconButton, Stack, Typography, Divider, Drawer, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { ChecklistItem } from './checklist-item'
import CHECKLIST_MOCK from '../../../mocks/checklist'

export default function ChecklistPopover() {
  const checklists = CHECKLIST_MOCK
  const drawer = useBoolean()
  const smUp = useResponsive('up', 'sm')
  return (
    <React.Fragment>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color="default"
        onClick={drawer.onTrue}
      >
        <Iconify icon="fluent:note-add-16-filled" width={24} />
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
            <IconButton onClick={() => null}>
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
          {checklists.map((checklist: any) => {
            const totalChecks = checklist.checks.length
            const completedChecks = checklist.checks.filter((check: any) => check.checked).length
            return (
              <ChecklistItem
                checklist={checklist}
                totalChecks={totalChecks}
                completedChecks={completedChecks}
              />
            )
          })}
        </Stack>
      </Drawer>
    </React.Fragment>
  )
}
