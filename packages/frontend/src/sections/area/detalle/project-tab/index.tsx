import { IProject, PROJECT_STATE_ARRAY } from '@adp/shared'
import { Box, FormControl, Autocomplete, TextField } from '@mui/material'
import { GET_PROJECTS_BY_AREA_AND_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import React, { useState, useMemo } from 'react'
import ProjectLine from './project-line'

type TProps = {
  areaId: string
}

export default function ProjectTab(props: TProps) {
  const { areaId } = props

  const [viewOption, setViewOption] = useState(PROJECT_STATE_ARRAY[1]) // IN_PROGRESS

  const handleViewModeChange = (event: React.ChangeEvent<{}>, option: any | null) => {
    if (option !== null) {
      setViewOption(option)
    }
  }
  const projectsQuery = useQuery(GET_PROJECTS_BY_AREA_AND_STATE, {
    variables: { areaId: Number(areaId), stateId: viewOption.id !== 0 ? viewOption.id : undefined },
    skip: !areaId,
  })

  const projects: IProject[] = useMemo(() => {
    if (!projectsQuery.data) return []
    return projectsQuery.data.projectsByAreaAndState
  }, [projectsQuery.data])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box className="ViewContainer">
        <FormControl>
          <Autocomplete
            style={{ width: 170, marginBottom: '16px' }}
            options={[{ id: 0, name: 'Todos' }, ...PROJECT_STATE_ARRAY]}
            getOptionLabel={(option) => option.name}
            value={viewOption}
            onChange={handleViewModeChange}
            renderInput={(params) => <TextField {...params} label="Estado" />}
            clearIcon={null}
          />
        </FormControl>
      </Box>
      {projects.map((project) => (
        <ProjectLine key={project.id} project={project} />
      ))}
    </Box>
  )
}
