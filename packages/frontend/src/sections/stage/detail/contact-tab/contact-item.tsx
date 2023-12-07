import { IContact, IStage } from '@adp/shared';
import React from 'react';
import { alpha } from '@mui/material/styles';
import { Avatar, Card, IconButton, ListItemText, MenuItem, Stack, Tooltip } from '@mui/material';
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import Iconify from 'src/components/iconify';
import { getStorageFileUrl } from 'src/utils/storage';
import { useBoolean } from 'src/hooks/use-boolean';
import ModalDelete from './modal-delete';

type TProps = {
  contact: IContact
  stage: IStage
  refetch: VoidFunction
}

export default function ContactItem(props: TProps) {
  const { contact, stage, refetch } = props
  const popover = usePopover()
  const modalDelete = useBoolean()

  const onDelete = () => {
    modalDelete.onTrue()
  }

  const call = () => {
    window.open(`tel:${contact.phone}`)
  }

  const sendEmail = () => {
    if (!contact.email) return
    window.open(`mailto:${contact.email}`)
  }

  return (
    <Stack component={Card} direction="row" spacing={2} key={contact.id} sx={{ p: 3 }}>
      <Avatar alt={contact.name} src={getStorageFileUrl(contact.image)} sx={{ width: 48, height: 48 }} />

      <Stack spacing={2} flexGrow={1}>
        <ListItemText
          primary={contact.name}
          secondary={
            <React.Fragment>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify icon="solar:phone-bold" width={16} />
                {contact.phone}
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify icon="fluent:mail-24-filled" width={16} />
                {contact.email}
              </Stack>
            </React.Fragment>
          }
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
            color: 'text.disabled',
          }}
        />

        <Stack spacing={1} direction="row">
          <Tooltip title="Llamar">
            <IconButton
              size="small"
              color="error"
              sx={{
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
                },
              }}
              onClick={call}
            >
              <Iconify width={18} icon="solar:phone-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Enviar correo">
            <IconButton
              size="small"
              color="primary"
              sx={{
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }}
              onClick={sendEmail}
            >
              <Iconify width={18} icon="fluent:mail-24-filled" />
            </IconButton>
          </Tooltip>
        </Stack>
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
        {/* <MenuItem
          onClick={() => {
            popover.onClose()
            onEdit()
          }}
        >
          <Iconify icon="mdi:pencil" />
          Editar
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            popover.onClose()
            onDelete()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="mdi:trash" />
          Eliminar
        </MenuItem>
      </CustomPopover>

      <ModalDelete stage={stage} contact={contact} refetch={refetch} modal={modalDelete} />
    </Stack>
  );
}