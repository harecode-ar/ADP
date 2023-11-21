import React from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Iconify from 'src/components/iconify'
import { useAuthContext } from 'src/auth/hooks'
import { getStorageFileUrl } from 'src/utils/storage'
import { IStageNote } from '@adp/shared'

type TProps = {
  setNotes: React.Dispatch<React.SetStateAction<IStageNote[]>>
}

const generateId = () => Math.floor(Math.random() * 1000000)

export default function KanbanDetailsCommentInput(props: TProps) {
  const { setNotes } = props
  const { user } = useAuthContext()

  const [message, setMessage] = React.useState('')

  const handleAddNote = () => {
    const newNote = {
      id: generateId(),
      message,
      createdAt: new Date().toISOString(),
      user: user
        ? {
            id: user.id,
            fullname: user.fullname,
            image: user.image,
          }
        : null,
    }
    // @ts-ignore
    setNotes((prev) => [...prev, newNote])
    setMessage('')
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        py: 3,
        px: 2.5,
      }}
    >
      {!!user && (
        <Avatar
          src={getStorageFileUrl(
            user.image,
            'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
          )}
          alt={user.fullname}
        />
      )}

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase
          fullWidth
          multiline
          rows={2}
          placeholder="Escribe una nota"
          sx={{ px: 1 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Stack direction="row" alignItems="center">
          <Stack direction="row" flexGrow={1}>
            <IconButton disabled>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Stack>

          <Button variant="contained" onClick={handleAddNote}>
            Comentar
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
