import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
  mutation createProject(
    $name: String!
    $description: String!
    $areaId: Int!
    $cost: Float
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
    $cost: Float
    $startDate: String
    $endDate: String
  ) {
    updateProject(
      id: $id
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

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
    }
  }
`

export const FINISH_PROJECT = gql`
  mutation finishProject($id: Int!) {
    finishProject(id: $id) {
      id
    }
  }
`
