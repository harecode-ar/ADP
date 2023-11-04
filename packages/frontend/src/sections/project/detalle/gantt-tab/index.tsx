import { IProject } from '@adp/shared'
import React from 'react'

type TProps = {
  project: IProject
}

export default function GanttTab(props: TProps) {
  const { project } = props
  console.log(project)
  return <div>GanttTab</div>
}
