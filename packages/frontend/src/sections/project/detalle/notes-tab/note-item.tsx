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
import { IProjectNote } from '@adp/shared'
import { DELETE_PROJECT_NOTE } from 'src/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'src/components/snackbar'

// ----------------------------------------------------------------------

interface TProps {
  refetch: () => void
  note: IProjectNote
}

export default function NoteItem(props: TProps) {
  const { note, refetch } = props
  const { user } = note
  const { enqueueSnackbar } = useSnackbar()
  const [deleteProjectNote] = useMutation(DELETE_PROJECT_NOTE)

  const onDelete = async () => {
    try {
      await deleteProjectNote({
        variables: {
          id: note.id,
        },
      })
      refetch()
      enqueueSnackbar('Nota borrada correctamente.', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar('La nota no pudo ser borrada.', { variant: 'error' })
    }
  }

  const renderHead = (
    <CardHeader
      disableTypography
      avatar={
        <Avatar
          src="https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
          alt={user?.fullname}
        />
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
        <IconButton>
          <Iconify sx={{ mr: 1 }} icon="material-symbols:delete" onClick={onDelete} />
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
    </Card>
  )
}
