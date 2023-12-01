import { INotification } from '@adp/shared'
import { Box, Stack, ListItemText, ListItemButton } from '@mui/material'
import Iconify from 'src/components/iconify'
import { fToNow } from 'src/utils/format-time'

type NotificationItemProps = {
  notification: INotification
  checked: boolean
  setSelected: React.Dispatch<React.SetStateAction<INotification[]>>
}

export default function NotificationItem({ notification, checked, setSelected }: NotificationItemProps) {

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(notification.title)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fToNow(Number(notification.createdAt))}
          {notification.category}
        </Stack>
      }
    />
  )

  const renderUnReadBadge = !notification.read && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  )

  const handleSelect = () => {
    setSelected(prev => {
      if (prev.find(n => n.id === notification.id)) {
        return prev.filter(n => n.id !== notification.id)
      }
      return [...prev, notification]
    })
  }

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...(checked && {
          bgcolor: (theme) => theme.palette.primary.lighter,
          '&:hover': {
            bgcolor: (theme) => theme.palette.primary.lighter,
          },
        }),
      }}
      onClick={handleSelect}
    >
      <Box sx={{
        height: '100%',
        position: 'relative',
        width: 30,
      }}>

        <Iconify icon={checked ? "ic:baseline-check-box" : "ic:baseline-check-box-outline-blank"}
          sx={{ position: 'absolute', top: 3, left: 0, color: (theme) => checked ? theme.palette.primary.main : theme.palette.grey[700] }} />
      </Box>

      {renderUnReadBadge}

      <Stack sx={{ flexGrow: 1 }}>
        {renderText}
      </Stack>

    </ListItemButton >
  )
}

// ----------------------------------------------------------------------

function reader(data: string) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  )
}
