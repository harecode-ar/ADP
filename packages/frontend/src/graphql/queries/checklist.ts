import { gql } from '@apollo/client'

export const CHECKLISTS = gql`
  query checklists ($userId: Int, $projectId: Int, $stageId: Int) {
    checklists (userId: $userId, projectId: $projectId, stageId: $stageId) {
      id
      title
      createdAt
      updatedAt

      user {
        id
        fullname
      }
      stage {
        id
        name
      }
      project {
        id
        name
      }
      checks {
        id
        title
        checked
        createdAt
        updatedAt
      }
    }
  }
`

export const CHECKS = gql`
  query checks ($checklistId: Int!) {
    checks (checklistId: $checklistId) {
      id
      title
      checked
      createdAt
      updatedAt
    }
  }
`