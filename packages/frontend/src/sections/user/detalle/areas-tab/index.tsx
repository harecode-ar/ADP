'use client'

import { IArea, IUser } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Box, Card, Stack, TextField, Typography, InputAdornment } from '@mui/material'
import { GET_USER_AREAS } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import AreaCard from './area-card'

type TProps = {
  user: IUser
}
export default function AreasTab(props: TProps) {
  const { user } = props
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const { data } = useQuery(GET_USER_AREAS, {
    variables: { userId: user.id },
    skip: !user,
  })

  const areas: IArea[] = useMemo(() => {
    if (!data) return []
    return data.userAreas || []
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
          <AreaCard key={area.id} area={area} user={user} />
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
