import { gql } from '@apollo/client'

export const GET_USER_CHECKLISTS = gql`
  query userChecklists {
    userChecklists {
      id
      title
      finished
      remember
      createdAt
      updatedAt
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
export const GET_CHECKLIST_BY_PROJECT = gql`
  query projectChecklists($projectId: Int!) {
    projectChecklists(projectId: $projectId) {
      id
      title
      createdAt
      updatedAt
      finished
      remember
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

export const GET_CHECKLIST_BY_STAGE = gql`
  query stageChecklists($stageId: Int!) {
    stageChecklists(stageId: $stageId) {
      id
      title
      createdAt
      updatedAt
      finished
      remember
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

export const GET_CHECKLIST = gql`
  query checklist($id: Int!) {
    checklist(id: $id) {
      id
      title
      remember
      projectId
      stageId
      createdAt
      updatedAt
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
