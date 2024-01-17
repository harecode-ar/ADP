import { IProject, TASK_STATE_ARRAY } from '@adp/shared'
import { Box, Autocomplete, TextField, Typography, Divider, Card } from '@mui/material'
import { GET_PROJECTS_BY_AREA_AND_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import React, { useState, useMemo } from 'react'
import ProjectLine from './project-line'

type TProps = {
  areaId: string
}

export default function ProjectTab(props: TProps) {
  const { areaId } = props

  const [viewOption, setViewOption] = useState(TASK_STATE_ARRAY[1]) // IN_PROGRESS

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
      <Card sx={{ p: 2 }}>
        <Box className="ViewContainer">
          <Autocomplete
            noOptionsText="No hay estados"
            style={{ width: 170, marginBottom: '16px' }}
            options={[{ id: 0, name: 'Todos' }, ...TASK_STATE_ARRAY]}
            getOptionLabel={(option) => option.name}
            value={viewOption}
            onChange={handleViewModeChange}
            renderInput={(params) => <TextField {...params} label="Estado" />}
            clearIcon={null}
          />
        </Box>
        {projects.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              marginTop: '16px',
            }}
          >
            <Typography>No hay proyectos asignados en ese estado en esta area.</Typography>
          </Box>
        ) : (
          <React.Fragment>
            {projects.map((project, index) => (
              <React.Fragment key={project.id}>
                {index !== 0 && (
                  <Divider
                    sx={{ mt: 2, mb: 1, borderBottomWidth: 2, borderBottomStyle: 'dotted' }}
                  />
                )}
                <ProjectLine project={project} />
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </Card>
    </Box>
  )
}
