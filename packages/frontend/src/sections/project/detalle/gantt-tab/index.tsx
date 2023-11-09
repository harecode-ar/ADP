import { IProject, IStage } from '@adp/shared'
import React from 'react'
import { Task } from 'gantt-task-react'
import GanttComponent from './gantt-component'

type TProps = {
  project: IProject
  stages: IStage[]
}

export default function GanttTab(props: TProps) {
  const { project, stages } = props

  const mappedStages: Task[] = stages.map((stage, index) => ({
    displayOrder: index + 2,
    id: String(stage.id),
    name: String(stage.name),
    progress: stage.progress * 100,
    start: new Date(stage.startDate),
    end: new Date(stage.endDate),
    project: String(project.id),
    type: 'task',
  }))

  const mappedProject: Task = {
    displayOrder: 1,
    id: String(project.id),
    name: String(project.name),
    progress: project.progress * 100,
    start: new Date(project.startDate),
    end: new Date(project.endDate),
    hideChildren: false,
    type: 'project',
  }
  const tasks: Task[] = [mappedProject, ...mappedStages]
  return <GanttComponent tasks={tasks} />
}
