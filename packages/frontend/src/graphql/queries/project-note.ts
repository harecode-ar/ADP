import { gql } from '@apollo/client'

export const GET_PROJECT_NOTES = gql`
  query projectNotes($projectId: Int!) {
    projectNotes(projectId: $projectId) {
      id
      message

      createdAt

      user {
        id
        fullname
      }
    }
  }
`
