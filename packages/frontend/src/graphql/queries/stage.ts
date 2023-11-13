import { gql } from '@apollo/client'

export const GET_STAGES_BY_PROJECT = gql`
  query getStagesByProject($projectId: Int!) {
    stagesByProject(projectId: $projectId) {
      id
      name
      progress
      startDate
      endDate
      description
      area {
        id
        name
      }
      responsible {
        id
        fullname
      }
      state {
        id
        name
      }
    }
  }
`
