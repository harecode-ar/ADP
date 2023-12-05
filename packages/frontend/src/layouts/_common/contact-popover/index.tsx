import { IContact } from '@adp/shared'
import { m } from 'framer-motion'
import React, { useState, useMemo } from 'react'
import {
  Avatar,
  IconButton,
  Stack,
  Typography,
  Divider,
  Drawer,
  Tooltip,
  MenuItem,
  ListItemText,
  Box,
} from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useQuery } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { GET_USER_CONTACTS } from 'src/graphql/queries'
import { getStorageFileUrl } from 'src/utils/storage'
import ModalCreate from './modal-create'
import ModalUpdate from './modal-update'

export default function ContactPopover() {
  const drawer = useBoolean()
  const smUp = useResponsive('up', 'sm')
  const modalCreate = useBoolean()
  const modalUpdate = useBoolean()

  const [selected, setSelected] = useState<IContact | null>(null)

  const { data, loading, refetch } = useQuery(GET_USER_CONTACTS)

  const contacts: IContact[] = useMemo(() => {
    if (!data) return []
    return data.userContacts
  }, [data])

  const isPhone = useResponsive('down', 'sm')

  const call = (phone: string) => {
    window.open(`tel:${phone}`, '_blank')
  }

  const handleUpdate = (contact: IContact) => {
    setSelected(contact)
    modalUpdate.onTrue()
  }

  if (loading) return null

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

        <Stack sx={{ p: 2.5 }} spacing={1}>
          {contacts.map((contact) => (
            <MenuItem key={contact.id} sx={{ p: 1 }}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar alt={contact.name} src={getStorageFileUrl(contact.image)} />
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.phone}
                    primaryTypographyProps={{ typography: 'subtitle2' }}
                    secondaryTypographyProps={{
                      typography: 'caption',
                      color: 'text.disabled',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip title="Editar contacto">
                    <IconButton onClick={() => handleUpdate(contact)}>
                      <Iconify icon="mdi:pencil" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar contacto">
                    <IconButton>
                      <Iconify icon="mdi:trash-can-outline" />
                    </IconButton>
                  </Tooltip>
                  {isPhone && (
                    <Tooltip title="Llamar">
                      <IconButton onClick={() => call(contact.phone)}>
                        <Iconify icon="mdi:phone" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Stack>
      </Drawer>

      <ModalCreate modal={modalCreate} refetch={refetch} />
      {
        modalUpdate.value && !!selected && <ModalUpdate modal={modalUpdate} refetch={refetch} contact={selected} />
      }
    </React.Fragment>
  )
}
