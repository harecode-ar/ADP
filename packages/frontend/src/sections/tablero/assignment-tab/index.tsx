'use client'

import { IProject, ITaskState, IStage, TASK_STATE_ARRAY, TASK_STATE_NAME } from '@adp/shared'
import React, { useState, useMemo, useEffect } from 'react'
import { Box, Stack, TextField, InputAdornment, Card, Autocomplete } from '@mui/material'
import { GET_USER_ASSIGNMENTS } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import Iconify from 'src/components/iconify'
import { ECustomEvent } from 'src/types'
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
  const defaultState = TASK_STATE_ARRAY.find((state) => state.name === TASK_STATE_NAME.IN_PROGRESS)
  const [selectedOptions, setSelectedOptions] = useState<EOption[]>([EOption.ALL])
  const [selectedState, setSelectedState] = useState<ITaskState[]>([defaultState ?? {} as ITaskState]);

  const handleChangeOptions = (event: React.ChangeEvent<{}>, newValue: EOption[]) => {
    if (newValue.length === 0 || EOption.ALL === newValue[newValue.length - 1]) {
      setSelectedOptions([EOption.ALL])
    } else {
      setSelectedOptions(newValue.filter((option) => option !== EOption.ALL))
    }
  }
  const handleStateChange = (_: React.ChangeEvent<{}>, newValues: ITaskState[] | null) => {
    if (!newValues || newValues.length === 0 || newValues[newValues.length - 1].id === 0) {
      setSelectedState([]);
      return;
    }
    setSelectedState(newValues.filter((state) => state.id !== 0));

  };

  const handleSearch = (event: any) => {
    const { value } = event.target
    setSearch(value)
  }

  const selectedStateIds = selectedState.map(state => state.id);
  // el error pareciera estar aca , stateId en este caso es un array pero la consulta get user assignments, me parece q no acepta que sea un array los ids...
  const { data, refetch } = useQuery(GET_USER_ASSIGNMENTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      stateId: selectedStateIds.length === 1 ? selectedStateIds[0] : null,
    },
  });


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
    if (!data) return assignment
    if (data.userProjects) {
      assignment.projects = [...(data.userProjects || [])].sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
      )
    }
    if (data.userStages) {
      assignment.stages = [...(data.userStages || [])].sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
      )
    }
    if (data.userSubStages) {
      assignment.subStages = [...(data.userSubStages || [])].sort((a, b) =>
        a.startDate > b.startDate ? 1 : -1
      )
    }
    return assignment
  }, [data])

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

  useEffect(() => {
    const handleRefetch = () => refetch()
    window.addEventListener(ECustomEvent.refetchAssignmentTab, handleRefetch)
    return () => {
      window.removeEventListener(ECustomEvent.refetchAssignmentTab, handleRefetch)
    }
  }, [refetch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Card sx={{ p: 2 }}>
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
              multiple
              sx={{ minWidth: 170 }}
              options={TASK_STATE_ARRAY as ITaskState[]}
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
      </Card>
      <AssignmentSection
        projects={filteredProjects}
        stages={filteredStages}
        subStages={filteredSubStages}
      />
    </Box>
  )
}
