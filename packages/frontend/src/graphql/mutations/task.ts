import { gql } from '@apollo/client'

export const START_TASK = gql`
  mutation startTask($projectId: Int, $stageId: Int) {
    startTask(projectId: $projectId, stageId: $stageId)
  }
`
export const FINISH_TASK = gql`
  mutation finishTask($projectId: Int, $stageId: Int) {
    finishTask(projectId: $projectId, stageId: $stageId)
  }
`
