'use client'

import { IArea, IProjectCountByState } from '@adp/shared'
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
import { GET_AREAS_FOR_DASHBOARD, GET_PROJECT_COUNT_BY_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import { paths } from 'src/routes/paths'
import { getStorageFileUrl } from 'src/utils/storage'
import { getColorFromAcp, getColorFromPacp } from 'src/utils/average-completition'
import { DEFAULT_PERCENTAGE_ALERT_MARGIN } from 'src/constants'
import ProyectAreaReportItem from './proyect-area-report-item'

export default function AreaTab() {
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const { data } = useQuery(GET_AREAS_FOR_DASHBOARD)

  const areas: IArea[] = useMemo(() => {
    if (!data) return []
    return data.areasForDashboard
  }, [data])

  console.log('areas', areas)

  const filteredAreas = useMemo(
    () => areas.filter((area) => area.name.toLowerCase().includes(search.toLowerCase())),
    [areas, search]
  )

  const notFound = !filteredAreas.length

  return (
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
    </Card>
  )
}

type AreaCardProps = {
  area: IArea
}

function AreaCard({ area }: AreaCardProps) {
  const { id, name, color, responsible } = area

  const { data } = useQuery(GET_PROJECT_COUNT_BY_STATE, {
    variables: {
      areas: [Number(id)],
    },
    skip: !id,
  })

  const report: IProjectCountByState = useMemo(() => {
    if (!data) return { new: 0, inProgress: 0, completed: 0, cancelled: 0 }
    return data.projectCountByState
  }, [data])

  const colorFromAcpOrPacp = (a: IArea) => {
     if (a.averageCompletition?.projectAcp === null) {
       return getColorFromPacp(a.averageCompletition?.projectPacp, DEFAULT_PERCENTAGE_ALERT_MARGIN)
     }
     return getColorFromAcp(a.averageCompletition?.projectAcp || null, DEFAULT_PERCENTAGE_ALERT_MARGIN)
   }

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
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Avatar
              alt={responsible?.fullname || 'Sin responsable'}
              src={responsible?.image ? getStorageFileUrl(responsible.image) : '/broken-image.jpg'}
              sx={{
                width: 64,
                height: 64,
                marginBottom: 3,
                border: `2px solid ${colorFromAcpOrPacp(area)}`,
              }}
            />

            <Typography
              variant="subtitle1"
              color="black"
              fontSize={20}
              sx={{
                textAlign: 'center',
              }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 0.5, mt: 0.5 }}
              fontSize={15}
            >
              {responsible?.fullname || 'Sin responsable'}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <ProyectAreaReportItem icon="entypo:new" value={report.new} size={17} />
            <ProyectAreaReportItem icon="mdi:tools" value={report.inProgress} size={15} />
            <ProyectAreaReportItem
              icon="fluent-mdl2:completed-solid"
              value={report.completed}
              size={15}
            />
            <ProyectAreaReportItem icon="ic:sharp-cancel" value={report.cancelled} size={18} />
          </Box>
        </Box>
      </Card>
    </Link>
  )
}
