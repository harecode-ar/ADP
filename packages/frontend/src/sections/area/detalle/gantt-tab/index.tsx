import { IProject, ITaskState, TASK_STATE, TASK_STATE_ARRAY } from '@adp/shared'
import React, { useState, useMemo } from 'react'
import { Task } from 'gantt-task-react'
import { GET_PROJECTS_BY_AREA_AND_STATE } from 'src/graphql/queries'
import { useQuery } from '@apollo/client'
import GanttComponent from './gantt-component'

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

export default function GanttTab(props: TProps) {
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

  const handleStateChange = (_: React.ChangeEvent<{}>, newValues: ITaskState[] | null) => {
    if (!newValues || newValues.length === 0 || newValues[newValues.length - 1].id === 0) {
      setSelectedState([ALL_STATE])
      return
    }
    setSelectedState(newValues.filter((state) => state.id !== 0))
  }

  return (
    <GanttComponent
      tasks={tasks}
      handleProjectStateChange={handleStateChange}
      projectState={selectedState}
    />
  )
}
