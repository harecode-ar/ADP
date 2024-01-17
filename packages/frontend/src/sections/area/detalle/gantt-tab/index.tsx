import { IProject, TASK_STATE_ARRAY } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Task } from 'gantt-task-react'
import { GET_PROJECTS_BY_AREA_AND_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import GanttComponent from './gantt-component'

type TProps = {
  areaId: string
}

export default function GanttTab(props: TProps) {
  const { areaId } = props

  const [projectState, setProjectState] = useState(TASK_STATE_ARRAY[1]) // IN_PROGRESS

  const handleProjectStateChange = (event: React.ChangeEvent<{}>, option: any | null) => {
    if (option !== null) {
      setProjectState(option)
    }
  }

  const projectsQuery = useQuery(GET_PROJECTS_BY_AREA_AND_STATE, {
    variables:
      projectState.id !== 0
        ? { areaId: Number(areaId), stateId: projectState.id }
        : { areaId: Number(areaId) },
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
    <GanttComponent
      tasks={tasks}
      handleProjectStateChange={handleProjectStateChange}
      projectState={projectState}
    />
  )
}
