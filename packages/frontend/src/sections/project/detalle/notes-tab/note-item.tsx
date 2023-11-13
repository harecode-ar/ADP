import React from 'react'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { alpha } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

import { fDate } from 'src/utils/format-time'

import Iconify from 'src/components/iconify'
import { IProjectNote } from '@adp/shared'

// ----------------------------------------------------------------------

interface TProps {
  note: IProjectNote
}

export default function NoteItem(props:  TProps) {
  const { note } = props
  const { user } = note

  const renderHead = (
    <CardHeader
      disableTypography
      avatar={<Avatar src="https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg" alt={user?.fullname} />}
      title={
        <Link color="inherit" variant="subtitle1">
          {user?.fullname}
        </Link>
      }
      subheader={
        <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
          {fDate(note.createdAt)}
        </Box>
      }
      action={
        <IconButton>
          <Iconify icon="eva:more-vertical-fill" />
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
