import type { IStageNote } from '@adp/shared'
import React, { useMemo } from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { fToNow } from 'src/utils/format-time'
import { getStorageFileUrl } from 'src/utils/storage'

type TProps = {
  notes: IStageNote[]
}

export default function KanbanDetailsCommentList(props: TProps) {
  const { notes } = props

  const sortedNotes = useMemo(() => [...notes].sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1
    }
    if (a.createdAt < b.createdAt) {
      return 1
    }
    return 0
  }), [notes])

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
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fToNow(Number(note.createdAt))}
              </Typography>
            </Stack>
            <Typography variant="body2">{note.message}</Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
