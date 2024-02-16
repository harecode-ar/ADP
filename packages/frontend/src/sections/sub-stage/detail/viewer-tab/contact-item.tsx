import { IUser } from '@adp/shared'
import React from 'react'
import NextLink from 'next/link'
import { Avatar, Card, IconButton, ListItemText, MenuItem, Stack, Link } from '@mui/material'
import { useBoolean } from 'src/hooks/use-boolean'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import Iconify from 'src/components/iconify'
import { getStorageFileUrl } from 'src/utils/storage'
import { paths } from 'src/routes/paths'
import ModalRemoveViewer from './modal-remove-viewer'

type TProps = {
  user: IUser
  stageId: number
  refetch: () => void
}

export default function UserItem(props: TProps) {
  const { user, stageId, refetch } = props
  const modalRemoveViewer = useBoolean()
  const popover = usePopover()

  return (
    <Stack component={Card} direction="row" spacing={2} key={user.id} sx={{ p: 3 }}>
      <Avatar
        alt={user.fullname}
        src={getStorageFileUrl(user.image)}
        sx={{ width: 48, height: 48 }}
      />
      <Stack spacing={2} flexGrow={1}>
        <ListItemText
          primary={user.fullname}
          secondary={
            <React.Fragment>
              {!!user.phone && (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="solar:phone-bold" width={16} />
                  {user.phone}
                </Stack>
              )}
              {!!user.email && (
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Iconify icon="fluent:mail-24-filled" width={16} />
                  {user.email}
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
        <Link
          href={paths.dashboard.user.detail.replace(':id', String(user.id))}
          component={NextLink}
          underline="none"
          color="inherit"
        >
          <MenuItem>
            <Iconify icon="eva:person-fill" />
            Ver perfil
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            popover.onClose()
            modalRemoveViewer.onTrue()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="mdi:trash" />
          Eliminar
        </MenuItem>
      </CustomPopover>

      <ModalRemoveViewer modal={modalRemoveViewer} userId={user.id} stageId={stageId} refetch={refetch} />
    </Stack>
  )
}
