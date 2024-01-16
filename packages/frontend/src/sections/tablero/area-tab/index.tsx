'use client'

import { IArea } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Box, Card, Stack, TextField, Typography, InputAdornment } from '@mui/material'
import { GET_AREAS_FOR_DASHBOARD } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import AreaCard from './area-card'

export default function AreaTab() {
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const { data } = useQuery(GET_AREAS_FOR_DASHBOARD)

  const areas: IArea[] = useMemo(() => {
    if (!data) return []
    return data.areasForDashboard || []
  }, [data])

  const filteredAreas = useMemo(
    () => areas.filter((area) => area.name.toLowerCase().includes(search.toLowerCase())),
    [areas, search]
  )

  const notFound = !filteredAreas.length

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Card sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Stack spacing={2} justifyContent="end" direction={{ xs: 'column', sm: 'row' }}>
            <TextField
              value={search}
              onChange={handleSearch}
              placeholder="Buscar..."
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
        </Box>
      </Card>
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
      {notFound && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography>No se encontraron resultados</Typography>
        </Box>
      )}
    </Box>
  )
}
