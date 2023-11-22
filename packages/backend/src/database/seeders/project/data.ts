import { PROJECT as PROJECT1, STAGES as STAGES1 } from './1'
import { PROJECT as PROJECT2, STAGES as STAGES2 } from './2'
import { PROJECT as PROJECT3, STAGES as STAGES3 } from './3'
import { PROJECT as PROJECT4, STAGES as STAGES4 } from './4'
import { PROJECT as PROJECT5, STAGES as STAGES5 } from './5'
import { PROJECT as PROJECT6, STAGES as STAGES6 } from './6'
import { PROJECT as PROJECT7, STAGES as STAGES7 } from './7'

const transformDate = (date: string, ref: string = '2023-11-15') => {
  const d = new Date(date)
  const r = new Date(ref)
  const t = new Date()
  let days = d.getDate() + (t.getDate() - r.getDate())
  let months = d.getMonth() + (t.getMonth() - r.getMonth())
  let years = d.getFullYear() + (t.getFullYear() - r.getFullYear())
  if (days / 28 > 1) {
    months += Math.round(days / 28)
    days %= 28
  }
  if (months / 11 > 1) {
    years += Math.round(months / 11)
    months %= 11
  }
  d.setDate(days)
  d.setMonth(months)
  d.setFullYear(years)
  return d.toISOString()
}

let id = 1
const S = [STAGES1, STAGES2, STAGES3, STAGES4, STAGES5, STAGES6, STAGES7]
export const STAGES = S.flatMap((stages, projectIndex) =>
  stages.map((stage) => ({
    ...stage,
    // eslint-disable-next-line no-plusplus
    id: id++,
    projectId: projectIndex + 1,
    startDate: transformDate(stage.startDate),
    endDate: transformDate(stage.endDate),
  }))
)

const P = [PROJECT1, PROJECT2, PROJECT3, PROJECT4, PROJECT5, PROJECT6, PROJECT7]
export const PROJECTS = P.map((project, index) => {
  const stages = STAGES.filter((stage) => stage.projectId === index + 1)
  const progress = stages.reduce((acc, stage) => acc + stage.progress, 0) / stages.length
  return {
    ...project,
    id: index + 1,
    progress,
    startDate: transformDate(project.startDate),
    endDate: transformDate(project.endDate),
  }
})
