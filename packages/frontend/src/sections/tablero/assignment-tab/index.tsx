'use client'

import { IProject, IStage } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Box, Stack, TextField, InputAdornment, Card } from '@mui/material'
import { GET_USER_ASSIGNMENTS } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import AssignmentSection from './assignment-section'

export default function AssignmentTab() {
  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const assignmentQuery = useQuery(GET_USER_ASSIGNMENTS, {
    fetchPolicy: 'cache-and-network',
  })

  const { projects, stages, subStages } = useMemo(() => {
    const assignment: {
      projects: IProject[]
      stages: IStage[]
      subStages: IStage[]
    } = {
      projects: [],
      stages: [],
      subStages: [],
    }
    if (!assignmentQuery.data) return assignment
    if (assignmentQuery.data.userProjects) {
      assignment.projects = [...(assignmentQuery.data.userProjects || [])].sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
      )
    }
    if (assignmentQuery.data.userStages) {
      assignment.stages = [...(assignmentQuery.data.userStages || [])].sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
      )
    }
    if (assignmentQuery.data.userSubStages) {
      assignment.subStages = [...(assignmentQuery.data.userSubStages || [])].sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
      )
    }
    return assignment
  }, [assignmentQuery.data])

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase())),
    [projects, search]
  )

  const filteredStages = useMemo(
    () => stages.filter((stage) => stage.name.toLowerCase().includes(search.toLowerCase())),
    [stages, search]
  )

  const filteredSubStages = useMemo(
    () =>
      subStages.filter((subStage) => subStage.name.toLowerCase().includes(search.toLowerCase())),
    [subStages, search]
  )

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
        <AssignmentSection
          projects={filteredProjects}
          stages={filteredStages}
          subStages={filteredSubStages}
        />
      </Box>
    </Card>
  )
}
