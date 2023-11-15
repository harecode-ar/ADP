'use client'

import { IArea } from '@adp/shared'
import React, { useState, useMemo } from 'react'
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
import { AREAS_FOR_LIST } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import { _socials } from 'src/_mock'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import SearchNotFound from 'src/components/search-not-found'
import { getStorageFileUrl } from 'src/utils/storage'

export default function AreaCardContainer() {
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const { data } = useQuery(AREAS_FOR_LIST)

  const areas: IArea[] = useMemo(() => {
    if (!data) return []
    return data.areas
  }, [data])

  const filteredAreas = useMemo(
    () => areas.filter((area) => area.name.toLowerCase().includes(search.toLowerCase())),
    [areas, search]
  )

  const notFound = !filteredAreas.length

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack spacing={2} justifyContent="end" direction={{ xs: 'column', sm: 'row' }}>
        <TextField
          value={search}
          onChange={handleSearch}
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
        {filteredAreas.map((area) => (
          <AreaCard key={area.id} area={area} />
        ))}
      </Box>
      {notFound && <SearchNotFound query={search} />}
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
