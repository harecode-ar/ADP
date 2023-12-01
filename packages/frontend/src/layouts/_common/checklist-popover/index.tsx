import { m } from 'framer-motion'
import React from 'react'
import { IconButton, Stack, Typography, Divider, Drawer } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'

export default function ChecklistPopover() {
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

          {!smUp && (
            <IconButton onClick={drawer.onFalse}>
              <Iconify icon="mingcute:close-line" />
            </IconButton>
          )}
        </Stack>
        <Divider />
      </Drawer>
    </React.Fragment>
  )
}