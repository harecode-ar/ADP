import { gql } from '@apollo/client'

export const CREATE_STAGE_VIEWER = gql`
  mutation createStageViewer($stageId: Int!, $userId: Int!) {
    createStageViewer(stageId: $stageId, userId: $userId) {
      id
    }
  }
`

export const REMOVE_STAGE_VIEWER = gql`
  mutation removeStageViewer($stageId: Int!, $userId: Int!) {
    removeStageViewer(stageId: $stageId, userId: $userId) {
      id
    }
  }
`
