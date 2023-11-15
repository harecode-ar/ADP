'use client'

import * as React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Card,
  Stack,
  Avatar,
  TextField,
  Typography,
  InputAdornment,
  Link,
} from '@mui/material'
import { _socials } from 'src/_mock'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import SearchNotFound from 'src/components/search-not-found'
import { IArea } from '@adp/shared'
import { getStorageFileUrl } from 'src/utils/storage'

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
          xl: 'repeat(4, 1fr)',
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
  const { id, name, color, responsible } = area
  return (
    <Link
      component={NextLink}
      href={paths.dashboard.area.detail.replace(':id', String(id))}
      underline="none"
    >
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
          backgroundColor: color,
        }}
      >
        <Avatar
          alt={responsible?.fullname || 'Sin responsable'}
          src={responsible?.image ? getStorageFileUrl(responsible.image) : '/broken-image.jpg'}
          sx={{ width: 64, height: 64, mb: 3 }}
        />

        <Typography variant="subtitle1" color="black" fontSize={20}>
          {name}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 0.5, mt: 0.5 }}
          fontSize={15}
        >
          {responsible?.fullname || 'Sin responsable'}
        </Typography>
      </Card>
    </Link>
  )
}
