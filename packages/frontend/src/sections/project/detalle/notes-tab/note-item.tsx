import React from 'react'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { CardContent, Tooltip } from '@mui/material'

import { fDate } from 'src/utils/format-time'

import Iconify from 'src/components/iconify'
import { IProjectNote } from '@adp/shared'
import { useBoolean } from 'src/hooks/use-boolean'
import { getStorageFileUrl } from 'src/utils/storage'
import { fShortenFileSize } from 'src/utils/format-number'
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail'
import ModalDelete from './modal-delete'

// ----------------------------------------------------------------------
interface TProps {
  refetch: () => void
  note: IProjectNote
}

export default function NoteItem(props: TProps) {
  const { note, refetch } = props
  const { user, files = [] } = note
  const modalDelete = useBoolean()

  return (
    <Card>
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
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {note.message && <Typography variant="body2">{note.message}</Typography>}
          {files.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              {files.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Tooltip title={file.originalName} placement="top">
                    <Link
                      href={getStorageFileUrl(file.filename)}
                      download={file.originalName}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none' }}
                    >
                      <Card
                        sx={{
                          p: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <FileThumbnail file="doc" sx={{ width: 36, height: 36 }} />
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '10px', fontWeight: 'bold', color: 'text.disabled' }}
                        >
                          {fShortenFileSize(file.size)}
                        </Typography>
                      </Card>
                    </Link>
                  </Tooltip>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </CardContent>
      <ModalDelete modal={modalDelete} refetch={refetch} noteId={note.id} />
    </Card>
  )
}
