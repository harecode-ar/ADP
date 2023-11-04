'use client'

import * as React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { _socials } from 'src/_mock'
import Iconify from 'src/components/iconify'
import { useRouter } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'
import SearchNotFound from 'src/components/search-not-found'
import { IArea } from '@adp/shared'

// ----------------------------------------------------------------------
type Props = {
  areas: IArea[]
  searchAreas: string
  onSearchAreas: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AreaCardContainer({ areas, searchAreas, onSearchAreas }: Props) {
  const notFound = !areas.length

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack
        spacing={2}
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ my: 5 }}
      >
        <Typography variant="h4">Areas</Typography>

        <TextField
          value={searchAreas}
          onChange={onSearchAreas}
          placeholder="Buscar areas..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: 1, sm: 260 } }}
        />
      </Stack>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {areas.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </Box>
      {notFound && <SearchNotFound query={searchAreas} />}
    </Box>
  )
}

type AreaCardProps = {
  area: IArea
}

function AreaCard({ area }: AreaCardProps) {
  const { id, name, rolename, responsible } = area
  const router = useRouter()
  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={() => router.push(paths.dashboard.area.detail.replace(':id', String(id)))}
    >
      <Avatar
        alt={responsible?.fullname || 'Sin responsable'}
        src='https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg"'
        sx={{ width: 64, height: 64, mb: 3 }}
      />

      <Typography variant="subtitle1" color="text.primary">
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, mt: 0.5 }}>
        {rolename}
      </Typography>
    </Card>
  )
}
