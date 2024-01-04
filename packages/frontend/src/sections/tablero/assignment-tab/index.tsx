'use client'

import { IProject, IProjectState, IStage, PROJECT_STATE_ARRAY } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Box, Stack, TextField, InputAdornment, Card, Autocomplete } from '@mui/material'
import { GET_USER_ASSIGNMENTS } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import AssignmentSection from './assignment-section'

enum EOption {
  ALL = 'Todos',
  PROJECT = 'Proyectos',
  STAGE = 'Etapas',
  SUB_STAGE = 'Sub etapas',
}

const OPTIONS = [EOption.ALL, EOption.PROJECT, EOption.STAGE, EOption.SUB_STAGE]

export default function AssignmentTab() {
  const [search, setSearch] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<EOption[]>([EOption.ALL])
  const [selectedState, setSelectedState] = useState<IProjectState | null>(null)

  const handleChangeOptions = (event: React.ChangeEvent<{}>, newValue: EOption[]) => {
    if (newValue.length === 0 || EOption.ALL === newValue[newValue.length - 1]) {
      setSelectedOptions([EOption.ALL])
    } else {
      setSelectedOptions(newValue.filter((option) => option !== EOption.ALL))
    }
  }
  const handleStateChange = (event: React.ChangeEvent<{}>, newValue: IProjectState | null) => {
    setSelectedState(newValue)
  }

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const assignmentQuery = useQuery(GET_USER_ASSIGNMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      stateId: selectedState?.id,
    },
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
    () =>
      projects.filter(
        (project) =>
          (selectedOptions.includes(EOption.ALL) || selectedOptions.includes(EOption.PROJECT)) &&
          project.name.toLowerCase().includes(search.toLowerCase())
      ),
    [projects, search, selectedOptions]
  )

  const filteredStages = useMemo(
    () =>
      stages.filter(
        (stage) =>
          (selectedOptions.includes(EOption.ALL) || selectedOptions.includes(EOption.STAGE)) &&
          stage.name.toLowerCase().includes(search.toLowerCase())
      ),
    [stages, search, selectedOptions]
  )

  const filteredSubStages = useMemo(
    () =>
      subStages.filter(
        (subStage) =>
          (selectedOptions.includes(EOption.ALL) || selectedOptions.includes(EOption.SUB_STAGE)) &&
          subStage.name.toLowerCase().includes(search.toLowerCase())
      ),
    [subStages, search, selectedOptions]
  )

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stack spacing={2} justifyContent="space-between" direction={{ xs: 'column', sm: 'row' }}>
          <Stack spacing={2} sx={{ width: '100%' }} direction={{ xs: 'column', sm: 'row' }}>
            <Autocomplete
              multiple
              options={OPTIONS}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label="Tipos" />}
              noOptionsText="No hay tipos"
              disableClearable
              value={selectedOptions}
              onChange={handleChangeOptions}
            />
            <Autocomplete
              sx={{ minWidth: 170 }}
              options={PROJECT_STATE_ARRAY as IProjectState[]}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Estado" />}
              noOptionsText="No hay estados"
              value={selectedState}
              onChange={handleStateChange}
            />
          </Stack>
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
