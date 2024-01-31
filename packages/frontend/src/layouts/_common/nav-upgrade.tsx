import { IStorage } from '@adp/shared'
// @mui
import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
// hooks
import { useAuthContext } from 'src/auth/hooks'
import { useQuery } from '@apollo/client'
import { GET_STORAGE } from 'src/graphql/queries'
// components
import Label from 'src/components/label'
import { getStorageFileUrl } from 'src/utils/storage'
import { LinearProgress } from '@mui/material'
import { fShortenFileSize } from 'src/utils/format-number'

// ----------------------------------------------------------------------

const calculateColorPorcentage = (used: number, total: number) => {
  const porcentage = (used / total) * 100
  if (porcentage < 65) return 'success'
  if (porcentage < 85) return 'warning'
  return 'error'
}

export default function NavUpgrade() {
  const { user } = useAuthContext()

  const storageQuery = useQuery(GET_STORAGE)
  const storage: IStorage | null = useMemo(() => {
    if (!storageQuery.data) return null
    return storageQuery.data.storage
  }, [storageQuery.data])

  const freeSpace = fShortenFileSize(storage?.freeStorageSize ?? 0)
  const usedSpace = fShortenFileSize(storage?.occupiedStorageSize ?? 0)
  const totalSpace = fShortenFileSize(storage?.storageSize ?? 0)

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          {/* <Avatar src={user?.photoURL} alt={user?.fullname} sx={{ width: 48, height: 48 }} /> */}
          {user && (
            <Avatar
              src={getStorageFileUrl(
                user.image,
                'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg'
              )}
              alt={user.fullname}
              sx={{ width: 48, height: 48 }}
            />
          )}
          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            Free
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mt: 1.5, mb: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullname}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {user?.email}
          </Typography>
        </Stack>

        <Box sx={{ width: '80%' }}>
          <LinearProgress
            variant="determinate"
            value={(Number(usedSpace) / Number(totalSpace)) * 100}
            color={calculateColorPorcentage(Number(usedSpace), Number(totalSpace))}
            sx={{
              marginBottom: 1,
            }}
          />
          <Typography
            sx={{
              marginBottom: 1,
              fontSize: 13,
            }}
          >
            Quedan {freeSpace} de {totalSpace} restantes
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}
