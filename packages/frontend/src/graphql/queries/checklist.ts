import { gql } from '@apollo/client'

export const GET_USER_CHECKLISTS = gql`
  query userChecklists {
    userChecklists {
      id
      title
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
  query checklistByProject($projectId: Int!) {
    checklistByProject(projectId: $projectId) {
      id
      title
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

export const GET_CHECKLIST_BY_STAGE = gql`
  query checklistByStage($stageId: Int!) {
    checklistByStage(stageId: $stageId) {
      id
      title
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

export const GET_CHECKLIST = gql`
  query checklist($id: Int!) {
    checklist(id: $id) {
      id
      title
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
