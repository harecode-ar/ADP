import { m } from 'framer-motion'
import React from 'react'
import { IconButton, Stack, Typography, Divider, Drawer, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import ModalCreate from './modal-create'

export default function ContactPopover() {
  const drawer = useBoolean()
  const smUp = useResponsive('up', 'sm')
  const modalCreate = useBoolean()

  const refetch = () => null

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
        <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} />
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
            Contactos
          </Typography>

          <Tooltip title="Crear nuevo contacto">
            <IconButton onClick={modalCreate.onTrue}>
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
      </Drawer>

      <ModalCreate modal={modalCreate} refetch={refetch} />
    </React.Fragment>
  )
}
