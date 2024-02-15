import { gql } from '@apollo/client'

export const CREATE_STAGE_VIEWER = gql`
  mutation createStageViewer($stageId: Int!, $userId: Int!) {
    createStageViewer(stageId: $stageId, userId: $userId) {
      id
      userId
      stageId
      createdAt
      updatedAt
    }
  }
`
