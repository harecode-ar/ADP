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
