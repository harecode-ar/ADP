import { IProject } from '@adp/shared'
import React from 'react'
import { Task } from 'gantt-task-react'
import GanttComponent from './gantt-component'

type TProps = {
  projects: IProject[]
}

export default function GanttTab(props: TProps) {
  const { projects } = props

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
  return <GanttComponent tasks={tasks} />
}
