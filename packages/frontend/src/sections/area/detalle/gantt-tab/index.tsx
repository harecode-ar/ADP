import { IProject, PROJECT_STATE_ARRAY } from '@adp/shared'
import React, { useState, useMemo }  from 'react'
import { Task } from 'gantt-task-react'
import { Box, FormControl, Autocomplete, TextField } from '@mui/material'
import { GET_PROJECTS_BY_AREA_AND_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import GanttComponent from './gantt-component'

type TProps = {
  areaId: string
}

export default function GanttTab(props: TProps) {
  const { areaId } = props

  const [viewOption, setViewOption] = useState(PROJECT_STATE_ARRAY[1]) // IN_PROGRESS

  const handleViewModeChange = (event: React.ChangeEvent<{}>, option: any | null) => {
    if (option !== null) {
      setViewOption(option)
    }
  }

  const projectsQuery = useQuery(GET_PROJECTS_BY_AREA_AND_STATE, {
    variables: viewOption.id !== 0 ? { areaId: Number(areaId), stateId: viewOption.id } : { areaId: Number(areaId) },
    skip: !areaId,
  })

  const projects: IProject[] = useMemo(() => {
    if (!projectsQuery.data) return []
    return projectsQuery?.data?.projectsByAreaAndState
  }, [projectsQuery?.data])


  // const mappedStages: Task[] = stages.map((stage, index) => ({
  //   displayOrder: index + 2,
  //   id: String(stage.id),
  //   name: String(stage.name),
  //   progress: stage.progress * 100,
  //   start: new Date(stage.startDate),
  //   end: new Date(stage.endDate),
  //   project: String(project.id),
  //   type: 'task',
  // }))

  const mappedProjects: Task[] = projects.map((project) => ({
    displayOrder: 1,
    id: String(project.id),
    name: String(project.name),
    progress: project.progress * 100,
    start: new Date(project.startDate),
    end: new Date(project.endDate),
    hideChildren: false,
    type: 'project',
  }))
  const tasks: Task[] = mappedProjects

  return (
    <Box className="ViewContainer">
      <FormControl>
        <Autocomplete
          style={{ width: 170, marginBottom: '16px' }}
          options={[{id:0, name: 'Todos'},...PROJECT_STATE_ARRAY]}
          getOptionLabel={(option) => option.name}
          value={viewOption}
          onChange={handleViewModeChange}
          renderInput={(params) => <TextField {...params} label="Estado" />}
          clearIcon={null}
        />
      </FormControl>
      {projects.length !== 0 && <GanttComponent tasks={tasks} />}
    </Box>
  )
}
