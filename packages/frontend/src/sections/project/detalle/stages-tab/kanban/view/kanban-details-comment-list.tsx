import type { IStageNote } from '@adp/shared'
import React from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { fToNow } from 'src/utils/format-time'
import Lightbox, { useLightBox } from 'src/components/lightbox'

// ----------------------------------------------------------------------

type TProps = {
  notes: IStageNote[]
}

export default function KanbanDetailsCommentList(props: TProps) {
  const { notes } = props

  const slides = notes
    .map((note) => ({ src: note.message }))

  const lightbox = useLightBox(slides)

  return (
    <React.Fragment>
      <Stack
        spacing={3}
        flexGrow={1}
        sx={{
          py: 3,
          px: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        {notes.map((note) => (
          <Stack key={note.id} direction="row" spacing={2}>
            {note.user?.image && <Avatar src={note.user.image} />}
            <Stack spacing={0.5} flexGrow={1}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">{note.user ? note.user.fullname : 'No asignado'}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {fToNow(note.createdAt)}
                </Typography>
              </Stack>
              <Typography variant="body2">{note.message}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </React.Fragment>
  )
}
