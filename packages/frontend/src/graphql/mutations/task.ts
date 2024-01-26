import { gql } from '@apollo/client'

export const START_TASK = gql`
  mutation startTask($projectId: Int, $stageId: Int) {
    startTask(projectId: $projectId, stageId: $stageId)
  }
`
