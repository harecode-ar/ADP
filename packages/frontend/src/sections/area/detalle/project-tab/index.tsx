import { IProject, ITaskState, TASK_STATE, TASK_STATE_ARRAY } from '@adp/shared'
import { Box, Autocomplete, TextField, Typography, Divider, Card } from '@mui/material'
import { GET_PROJECTS_BY_AREA_AND_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import React, { useState, useMemo } from 'react'
import ProjectLine from './project-line'

type TProps = {
  areaId: string
}

const DEFAULT_STATE = [
  TASK_STATE_ARRAY.find((state) => state.id === TASK_STATE.ON_HOLD),
  TASK_STATE_ARRAY.find((state) => state.id === TASK_STATE.IN_PROGRESS),
] as ITaskState[]

const ALL_STATE = {
  id: 0,
  name: 'Todos',
} as ITaskState

export default function ProjectTab(props: TProps) {
  const { areaId } = props

  const [selectedState, setSelectedState] = useState<ITaskState[]>(DEFAULT_STATE)

  const selectedStateIds = useMemo(() => {
    if (selectedState[0].id === 0) return TASK_STATE_ARRAY.map((state) => state.id)
    return selectedState.map((state) => state.id)
  }, [selectedState])

  const projectsQuery = useQuery(GET_PROJECTS_BY_AREA_AND_STATE, {
    variables: { areaId: Number(areaId), stateId: selectedStateIds },
    skip: !areaId,
  })

  const projects: IProject[] = useMemo(() => {
    if (!projectsQuery.data) return []
    const { projectsByAreaAndState = [] } = projectsQuery.data
    return [...projectsByAreaAndState].sort((a, b) => a.stateId - b.stateId)
  }, [projectsQuery.data])

  const handleStateChange = (_: React.ChangeEvent<{}>, newValues: ITaskState[] | null) => {
    if (!newValues || newValues.length === 0 || newValues[newValues.length - 1].id === 0) {
      setSelectedState([ALL_STATE])
      return
    }
    setSelectedState(newValues.filter((state) => state.id !== 0))
  }

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
            multiple
            sx={{ minWidth: 170, marginBottom: '16px' }}
            options={[ALL_STATE, ...TASK_STATE_ARRAY] as ITaskState[]}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Estado" />}
            noOptionsText="No hay estados"
            value={selectedState}
            onChange={handleStateChange}
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
