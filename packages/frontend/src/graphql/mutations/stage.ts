import { gql } from '@apollo/client'

export const CREATE_STAGE = gql`
  mutation createStage(
    $name: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $areaId: Int!
    $projectId: Int!
    $parentStageId: Int
  ) {
    createStage(
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      areaId: $areaId
      projectId: $projectId
      parentStageId: $parentStageId
    ) {
      id
    }
  }
`

export const UPDATE_STAGE = gql`
  mutation updateStage(
    $id: Int!
    $name: String
    $description: String
    $startDate: String
    $endDate: String
    $stateId: Int
    $progress: Float
    $areaId: Int
    $projectId: Int
    $parentStageId: Int
  ) {
    updateStage(
      id: $id
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      stateId: $stateId
      progress: $progress
      areaId: $areaId
      projectId: $projectId
      parentStageId: $parentStageId
    ) {
      id
    }
  }
`

export const DELETE_STAGE = gql`
  mutation deleteStage($id: Int!) {
    deleteStage(id: $id) {
      id
    }
  }
`
