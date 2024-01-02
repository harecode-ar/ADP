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
    $stageId: Int
    $projectId: Int
    $checks: [CheckInput]
  ) {
    updateChecklist(
      id: $id
      title: $title
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
