import { gql } from '@apollo/client'

export const CREATE_CHECKLIST = gql`
  mutation createChecklist(
    $title: String!
    $stageId: Int
    $projectId: Int
    $checks: [CheckInput]
  ) {
    createChecklist(
      title: $title
      stageId: $stageId
      projectId: $projectId
      checks: $checks
    ) {
      id
    }
  }
`

export const UPDATE_CHECKLIST = gql`
  mutation updateChecklist(
    $id: Int!
    $title: String
    $remember: Boolean!
    $stageId: Int
    $projectId: Int
    $checks: [CheckInput]
  ) {
    updateChecklist(
      id: $id
      title: $title
      remember: $remember
      stageId: $stageId
      projectId: $projectId
      checks: $checks
    ) {
      id
    }
  }
`

export const DELETE_CHECKLIST = gql`
  mutation deleteChecklist($id: Int!) {
    deleteChecklist(id: $id) {
      id
    }
  }
`
