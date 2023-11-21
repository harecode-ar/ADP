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
      projectId
      stateId
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

export const GET_STAGE = gql`
  query getStage($id: Int!) {
    stage(id: $id) {
      id
      name
      progress
      startDate
      endDate
      description
      projectId
      area {
        id
        name
      }
      responsible {
        id
        fullname
        image
      }
      state {
        id
        name
      }
      notes {
        id
        message
        createdAt
        user {
          id
          fullname
          image
        }
      }
    }
  }
`
