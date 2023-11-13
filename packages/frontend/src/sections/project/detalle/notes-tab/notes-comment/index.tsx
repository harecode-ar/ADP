import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useBoolean } from 'src/hooks/use-boolean'

import { fDate } from 'src/utils/format-time'

import Iconify from 'src/components/iconify'

// ----------------------------------------------------------------------

type TProps = {
  message: string
}

export default function PostCommentItem({ message}: TProps) {
  const reply = useBoolean()

  return (
    <ListItem
      sx={{
        p: 0,
        pt: 3,
        alignItems: 'flex-start'
      }}
    >
      {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2, width: 48, height: 48 }} /> */}

      <Stack
        flexGrow={1}
        sx={{
          pb: 3,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        {/* <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {name}
          </Typography> */}

        {/* <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDate(postedAt)}
          </Typography> */}

        <Typography variant="body2" sx={{ mt: 2 }}>
            {message}
          </Typography>

        {reply.value && (
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth autoFocus placeholder="Write comment..." />
          </Box>
        )}
      </Stack>
    </ListItem>
  )
}
