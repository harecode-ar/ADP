'use client'

import * as React from 'react'
import NextLink from 'next/link'
import { Box, Card, Stack, Avatar, TextField, Typography, InputAdornment, Link } from '@mui/material'
import { _socials } from 'src/_mock'
import Iconify from 'src/components/iconify'
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
  return (
    <Link component={NextLink} href={paths.dashboard.area.detail.replace(':id', String(id))} underline='none'>
      <Card
        sx={{
          py: 5,
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
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
    </Link>
  )
}
