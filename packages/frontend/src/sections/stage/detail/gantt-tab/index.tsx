import { IStage, STAGE_STATE } from '@adp/shared'
import React from 'react'
import { Task } from 'gantt-task-react'
import GanttComponent from './gantt-component'

type TProps = {
  stage: IStage
  subStages: IStage[]
}

export default function GanttTab(props: TProps) {
  const { stage, subStages } = props

  const mappedSubStages: Task[] = subStages
    .filter((subStage) => subStage.stateId !== STAGE_STATE.CANCELLED)
    .map((subStage, index) => ({
      displayOrder: index + 2,
      id: String(subStage.id),
      name: String(subStage.name),
      progress: subStage.progress * 100,
      start: new Date(subStage.startDate),
      end: new Date(subStage.endDate),
      project: String(subStage.id),
      type: 'task',
    }))

  const mappedStage: Task = {
    displayOrder: 1,
    id: String(stage.id),
    name: String(stage.name),
    progress: stage.progress * 100,
    start: new Date(stage.startDate),
    end: new Date(stage.endDate),
    hideChildren: false,
    type: 'project',
  }
  const tasks: Task[] = [mappedStage, ...mappedSubStages]
  return <GanttComponent tasks={tasks} />
}
