import React from 'react'
import {
  Box,
  Link,
  Card,
  Avatar,
  IconButton,
  CardHeader,
  Typography,
  CardContent,
  Tooltip,
} from '@mui/material'
import { fDate, fToNow} from 'src/utils/format-time'
import Iconify from 'src/components/iconify'
import { IProjectNote, IStageNote } from '@adp/shared'
import { getStorageFileUrl } from 'src/utils/storage'
import { fShortenFileSize } from 'src/utils/format-number'
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail'

interface TProps {
  note: IProjectNote | IStageNote
  onDelete: (noteId: number) => void
}

export default function NoteItem(props: TProps) {
  const { note, onDelete } = props
  const { user, files = [] } = note

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
            <Tooltip title={`${fDate(Number(note.createdAt))} - ${new Date(Number(note.createdAt)).toLocaleTimeString()}`}>
              <Typography variant="caption">
                {fToNow(Number(note.createdAt))}
              </Typography>
            </Tooltip>
            
          </Box>
        }
        action={
          <IconButton onClick={() => onDelete(note.id)}>
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
    </Card>
  )
}
