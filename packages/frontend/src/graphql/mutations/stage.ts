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

export const FINISH_STAGE = gql`
  mutation finishStage($id: Int!) {
    finishStage(id: $id) {
      id
    }
  }
`

export const CREATE_SUB_STAGE = gql`
  mutation createSubStage(
    $name: String!
    $description: String!
    $startDate: String!
    $endDate: String!
    $areaId: Int!
    $parentStageId: Int!
  ) {
    createSubStage(
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      areaId: $areaId
      parentStageId: $parentStageId
    ) {
      id
    }
  }
`

export const UPDATE_SUB_STAGE = gql`
  mutation updateSubStage(
    $id: Int!
    $name: String
    $description: String
    $startDate: String
    $endDate: String
    $areaId: Int
    $parentStageId: Int
  ) {
    updateSubStage(
      id: $id
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      areaId: $areaId
      parentStageId: $parentStageId
    ) {
      id
    }
  }
`

export const DELETE_SUB_STAGE = gql`
  mutation deleteSubStage($id: Int!) {
    deleteSubStage(id: $id) {
      id
    }
  }
`

export const FINISH_SUB_STAGE = gql`
  mutation finishSubStage($id: Int!) {
    finishSubStage(id: $id) {
      id
    }
  }
`
