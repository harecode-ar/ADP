import { gql } from '@apollo/client'

export const CREATE_PROJECT_VIEWER = gql`
  mutation createProjectVisualizer($projectId: Int!, $userId: Int!) {
    createProjectVisualizer(projectId: $projectId, userId: $userId) {
      id
    }
  }
`
