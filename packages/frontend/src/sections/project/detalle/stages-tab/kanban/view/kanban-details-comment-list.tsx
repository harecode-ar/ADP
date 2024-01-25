import type { IStageNote } from '@adp/shared'
import React, { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { fDate, fToNow } from 'src/utils/format-time'
import { getStorageFileUrl } from 'src/utils/storage'
import { Box, Card, Tooltip, Link } from '@mui/material'
import { fShortenFileSize } from 'src/utils/format-number'
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail'

type TProps = {
  notes: IStageNote[]
}

export default function KanbanDetailsCommentList(props: TProps) {
  const { notes } = props

  const sortedNotes = useMemo(
    () =>
      [...notes].sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        }
        if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      }),
    [notes]
  )

  return (
    <Stack
      spacing={3}
      flexGrow={1}
      sx={{
        py: 3,
        px: 2.5,
        bgcolor: 'background.neutral',
      }}
    >
      {sortedNotes.map((note) => (
        <Stack key={note.id} direction="row" spacing={2}>
          {note.user?.image && <Avatar src={getStorageFileUrl(note.user.image)} />}
          <Stack spacing={0.5} flexGrow={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2">
                {note.user ? note.user.fullname : 'No asignado'}
              </Typography>
              <Tooltip title={`${fDate(new Date(Number(note.createdAt) - 3*60*60*1000))} - ${new Date(Number(note.createdAt)).toLocaleTimeString()}`}>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {fToNow(Number(note.createdAt))}
                </Typography>
              </Tooltip>
            </Stack>
            <Typography variant="body2">{note.message}</Typography>
            {note.files && note.files.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                }}
              >
                {note.files.map((file) => (
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
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
