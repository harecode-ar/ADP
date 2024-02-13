import { IContact } from '@adp/shared'
import { m } from 'framer-motion'
import React, { useState, useMemo, useEffect } from 'react'
import { IconButton, Stack, Typography, Divider, Drawer, Tooltip } from '@mui/material'
import Iconify from 'src/components/iconify'
import { varHover } from 'src/components/animate'
import { useQuery } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { useResponsive } from 'src/hooks/use-responsive'
import { GET_USER_CONTACTS } from 'src/graphql/queries'
import { ECustomEvent } from 'src/types'
import ModalCreate from './modal-create'
import ModalUpdate from './modal-update'
import ModalDelete from './modal-delete'
import ContactItem from './contact-item'

export default function ContactPopover() {
  const drawer = useBoolean()
  const smUp = useResponsive('up', 'sm')
  const modalCreate = useBoolean()
  const modalUpdate = useBoolean()
  const modalDelete = useBoolean()

  const [selected, setSelected] = useState<IContact | null>(null)

  const { data, loading, refetch } = useQuery(GET_USER_CONTACTS)

  const contacts: IContact[] = useMemo(() => {
    if (!data) return []
    return data.userContacts || []
  }, [data])

  const handleCall = (contact: IContact) => {
    window.open(`tel:${contact.phone}`, '_blank')
  }

  const handleSendEmail = (contact: IContact) => {
    if (!contact.email) return
    window.open(`mailto:${contact.email}`)
  }

  const handleUpdate = (contact: IContact) => {
    setSelected(contact)
    modalUpdate.onTrue()
  }

  const handleDelete = (contact: IContact) => {
    setSelected(contact)
    modalDelete.onTrue()
  }

  useEffect(() => {
    window.addEventListener(ECustomEvent.refetchUserContacts, refetch)
    return () => window.removeEventListener(ECustomEvent.refetchUserContacts, refetch)
  }, [refetch])

  if (loading) return null

  return (
    <React.Fragment>
      <Tooltip title="Contactos" arrow>
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
      </Tooltip>

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
            <ContactItem
              key={contact.id}
              contact={contact}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleCall={handleCall}
              handleSendEmail={handleSendEmail}
            />
          ))}
        </Stack>
      </Drawer>

      <ModalCreate modal={modalCreate} refetch={refetch} />
      {modalUpdate.value && !!selected && (
        <ModalUpdate modal={modalUpdate} refetch={refetch} contact={selected} />
      )}
      {modalDelete.value && !!selected && (
        <ModalDelete modal={modalDelete} refetch={refetch} contact={selected} />
      )}
    </React.Fragment>
  )
}
