import type { IStageNote } from '@adp/shared'
import React from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { fDate } from 'src/utils/format-time'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { getStorageFileUrl } from 'src/utils/storage'
import ModalDelete from './modal-delete'

// ----------------------------------------------------------------------
interface TProps {
  refetch: () => void
  note: IStageNote
}

export default function NoteItem(props: TProps) {
  const { note, refetch } = props
  const { user } = note
  const modalDelete = useBoolean()

  const renderHead = (
    <CardHeader
      disableTypography
      avatar={
        user ? (
          <Avatar
            src={getStorageFileUrl(
              user.image,
              'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
            )}
            alt={user.fullname}
          />
        ) : null
      }
      title={
        <Link color="inherit" variant="subtitle1">
          {user?.fullname}
        </Link>
      }
      subheader={
        <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
          {fDate(new Date(Number(note.createdAt)))} -{' '}
          {new Date(Number(note.createdAt)).toLocaleTimeString()}
        </Box>
      }
      action={
        <IconButton
          onClick={() => {
            modalDelete.onTrue()
          }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      }
    />
  )

  return (
    <Card>
      {renderHead}
      <Typography
        variant="body2"
        sx={{
          p: (theme) => theme.spacing(3, 3, 2, 3),
        }}
      >
        {note.message}
      </Typography>
      <ModalDelete modal={modalDelete} refetch={refetch} noteId={note.id} />
    </Card>
  )
}
