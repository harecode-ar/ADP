import { PROJECT as PROJECT1, STAGES as STAGES1 } from './1'
import { PROJECT as PROJECT2, STAGES as STAGES2 } from './2'
import { PROJECT as PROJECT3, STAGES as STAGES3 } from './3'
import { PROJECT as PROJECT4, STAGES as STAGES4 } from './4'
import { PROJECT as PROJECT5, STAGES as STAGES5 } from './5'
import { PROJECT as PROJECT6, STAGES as STAGES6 } from './6'
import { PROJECT as PROJECT7, STAGES as STAGES7 } from './7'

let id = 1
const S = [STAGES1, STAGES2, STAGES3, STAGES4, STAGES5, STAGES6, STAGES7]
export const STAGES = S.flatMap((stages, projectIndex) =>
  stages.map((stage) => ({
    ...stage,
    // eslint-disable-next-line no-plusplus
    id: id++,
    projectId: projectIndex + 1,
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
  }
})
