import { gql } from '@apollo/client'

export const CREATE_PROJECT_NOTE = gql`
  mutation createProjectNote($message: String!, $projectId: Int!) {
    createProjectNote(message: $message, projectId: $projectId) {
      id
    }
  }
`
export const DELETE_PROJECT_NOTE = gql`
  mutation deleteProjectNote($id: Int!) {
    deleteProjectNote(id: $id) {
      id
    }
  }
`
