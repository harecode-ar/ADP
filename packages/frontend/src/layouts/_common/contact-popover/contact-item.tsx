import { IContact } from '@adp/shared'
import React from 'react'
import {
  Avatar,
  IconButton,
  Stack,
  Divider,
  MenuItem,
  ListItemText,
  Box,
} from '@mui/material'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import Iconify from 'src/components/iconify'
import { getStorageFileUrl } from 'src/utils/storage'

type TProps = {
  contact: IContact
  handleUpdate: (contact: IContact) => void
  handleDelete: (contact: IContact) => void
  handleCall: (contact: IContact) => void
  handleSendEmail: (contact: IContact) => void
}

export default function ContactItem(props: TProps) {
  const { contact, handleUpdate, handleDelete, handleCall, handleSendEmail } = props
  const popover = usePopover()
  return (
    <MenuItem sx={{ p: 1 }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar alt={contact.name} src={getStorageFileUrl(contact.image)} />
          <ListItemText
            primary={contact.name}
            secondary={
              <React.Fragment>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="solar:phone-bold" width={16} />
                  {contact.phone}
                </Stack>
                {
                  !!contact.email && (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Iconify icon="fluent:mail-24-filled" width={16} />
                      {contact.email}
                    </Stack>
                  )
                }
              </React.Fragment>
            }
            primaryTypographyProps={{ typography: 'subtitle2' }}
            secondaryTypographyProps={{
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={popover.onOpen}
          >
            <Iconify icon="eva:more-horizontal-fill" />
          </IconButton>
        </Box>

        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          sx={{ width: 160 }}
        >
          <MenuItem
            onClick={() => {
              popover.onClose()
              handleCall(contact)
            }}
          >
            <Iconify icon="solar:phone-bold" />
            Llamar
          </MenuItem>
          {
            !!contact.email && (
              <MenuItem
                onClick={() => {
                  popover.onClose()
                  handleSendEmail(contact)
                }}
              >
                <Iconify icon="fluent:mail-24-filled" />
                Enviar correo
              </MenuItem>
            )
          }
          <Divider />
          <MenuItem
            onClick={() => {
              popover.onClose()
              handleUpdate(contact)
            }}
          >
            <Iconify icon="mdi:pencil" />
            Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              popover.onClose()
              handleDelete(contact)
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="mdi:trash" />
            Eliminar
          </MenuItem>
        </CustomPopover>
      </Box>
    </MenuItem>
  )
}
