import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $areaId: Int!
    $cost: String
    $startDate: String!
    $endDate: String!
  ) {
    createProject(
      name: $name
      description: $description
      areaId: $areaId
      cost: $cost
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: Int!
    $name: String
    $description: String
    $areaId: Int
    $cost: String
    $startDate: String
    $endDate: String
    $stateId: Int
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      areaId: $areaId
      cost: $cost
      startDate: $startDate
      endDate: $endDate
      stateId: $stateId
    ) {
      id
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
    }
  }
`
