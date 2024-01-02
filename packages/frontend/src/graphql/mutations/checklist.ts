import { gql } from '@apollo/client'

export const CREATE_CHECKLIST = gql`
  mutation createChecklist(
    $title: String!
    $remember: Boolean!
    $stageId: Int
    $projectId: Int
    $checks: [CheckInput]
  ) {
    createChecklist(
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

export const UPDATE_REMEMBER_CHECKLIST = gql`
  mutation updateRememberChecklist($id: Int!, $remember: Boolean!) {
    updateRememberChecklist(id: $id, remember: $remember) {
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
