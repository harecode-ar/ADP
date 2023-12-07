'use client'

import { IProject } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material'
import { GET_USER_PROJECTS } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import { _socials } from 'src/_mock'
import Iconify from 'src/components/iconify'
import AssignmentItem from './assignment-item';

export default function AssignmentTab() {
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const projectQuery = useQuery(GET_USER_PROJECTS)

  const projects: IProject[] = useMemo(() => {
    if (!projectQuery.data) return []
    return projectQuery.data.userProjects
  }, [projectQuery.data])

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase())),
    [projects, search]
  )

  const notProjectsFound = !filteredProjects.length

  return (
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

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Proyectos
        </Typography>
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


          {filteredProjects.map((project) => (
            <AssignmentItem key={project.id} project={project} />
          ))}
        </Box>
        {notProjectsFound && (
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
    </Box>
  )
}