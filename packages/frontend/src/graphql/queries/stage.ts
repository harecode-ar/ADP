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
      hasStages
      projectId
      stateId
      acp
      pacp
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

export const GET_SUB_STAGES_BY_STAGE = gql`
  query getSubStagesByStage($stageId: Int!) {
    subStagesByStage(stageId: $stageId) {
      id
      name
      progress
      startDate
      endDate
      description
      hasStages
      projectId
      stateId
      acp
      pacp
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
      hasStages
      projectId
      stateId
      acp
      pacp
      project {
        id
        name
        startDate
        endDate
      }
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
        files {
          id
          originalName
          filename
          size
        }
      }
    }
  }
`

export const GET_SUB_STAGE = gql`
  query getSubStage($id: Int!) {
    subStage(id: $id) {
      id
      name
      progress
      startDate
      endDate
      description
      hasStages
      projectId
      parentStageId
      stateId
      acp
      pacp
      parentStage {
        id
        name
      }
      project {
        id
        name
        startDate
        endDate
      }
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
