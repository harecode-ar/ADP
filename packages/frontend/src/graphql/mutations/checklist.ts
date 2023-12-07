import { gql } from '@apollo/client'

export const CREATE_CHECKLIST = gql`
  mutation createChecklist(
    $title: String!
    $stageId: Int
    $projectId: Int
  ) {
    createChecklist(
      title: $title
      stageId: $stageId
      projectId: $projectId
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
  ) {
    updateChecklist(
      id: $id
      title: $title
      stageId: $stageId
      projectId: $projectId
    ) {
      id
    }
  }
`

export const DELETE_CHECKLIST = gql`
  mutation deleteChecklist($id: Int!) {
    deleteChecklist(id: $id)
  }
`


