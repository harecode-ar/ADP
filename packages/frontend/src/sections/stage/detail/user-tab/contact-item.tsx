import { IUser } from '@adp/shared'
import React from 'react'
import { Avatar, Card, ListItemText, Stack } from '@mui/material'
import Iconify from 'src/components/iconify'
import { getStorageFileUrl } from 'src/utils/storage'

type TProps = {
  user: IUser
}

export default function UserItem(props: TProps) {
  const { user } = props
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
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Iconify icon="solar:phone-bold" width={16} />
                {user.phone}
              </Stack>
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
    </Stack>
  )
}
