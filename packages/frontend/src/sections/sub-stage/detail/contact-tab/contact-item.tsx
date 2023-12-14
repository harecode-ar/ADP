import { IContact, IStage } from '@adp/shared'
import React from 'react'
import { Avatar, Card, IconButton, ListItemText, MenuItem, Stack, Divider } from '@mui/material'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import Iconify from 'src/components/iconify'
import { getStorageFileUrl } from 'src/utils/storage'
import { useBoolean } from 'src/hooks/use-boolean'
import ModalDelete from './modal-delete'

type TProps = {
  contact: IContact
  subStage: IStage
  refetch: VoidFunction
}

export default function ContactItem(props: TProps) {
  const { contact, subStage, refetch } = props
  const popover = usePopover()
  const modalDelete = useBoolean()

  const handleCall = () => {
    window.open(`tel:${contact.phone}`)
  }

  const handleSendEmail = () => {
    if (!contact.email) return
    window.open(`mailto:${contact.email}`)
  }

  return (
    <Stack component={Card} direction="row" spacing={2} key={contact.id} sx={{ p: 3 }}>
      <Avatar
        alt={contact.name}
        src={getStorageFileUrl(contact.image)}
        sx={{ width: 48, height: 48 }}
      />

      <Stack spacing={2} flexGrow={1}>
        <ListItemText
          primary={contact.name}
          secondary={
            <React.Fragment>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify icon="solar:phone-bold" width={16} />
                {contact.phone}
              </Stack>
              {!!contact.email && (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="fluent:mail-24-filled" width={16} />
                  {contact.email}
                </Stack>
              )}
            </React.Fragment>
          }
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />
      </Stack>

      <IconButton
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <Iconify icon="eva:more-horizontal-fill" />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="left-center"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose()
            handleCall()
          }}
        >
          <Iconify icon="solar:phone-bold" />
          Llamar
        </MenuItem>
        {!!contact.email && (
          <MenuItem
            onClick={() => {
              popover.onClose()
              handleSendEmail()
            }}
          >
            <Iconify icon="fluent:mail-24-filled" />
            Enviar correo
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            popover.onClose()
            modalDelete.onTrue()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="mdi:trash" />
          Eliminar
        </MenuItem>
      </CustomPopover>

      <ModalDelete subStage={subStage} contact={contact} refetch={refetch} modal={modalDelete} />
    </Stack>
  )
}
