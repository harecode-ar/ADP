'use client'

import { IArea } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Container, Box } from '@mui/material'
import { AREAS_FOR_LIST } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import { useSettingsContext } from 'src/components/settings'
import UserCard from './user-card'
import AreaCardContainer from './area-card-container'

// ----------------------------------------------------------------------

export default function TableroView() {
  const settings = useSettingsContext()
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

  console.log(areas, filteredAreas)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <UserCard />
      </Box>
      <AreaCardContainer searchAreas={search} areas={filteredAreas} onSearchAreas={handleSearch} />
    </Container>
  )
}
