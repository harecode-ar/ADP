import { gql } from '@apollo/client'

export const USERS_FOR_LIST = gql`
  query usersForList {
    users {
      id
      firstname
      lastname
      email
      phone
      image
      roleId
    }
  }
`
export const USERS_FOR_REPORT = gql`
  query usersForReport {
    usersForReport {
      id
      firstname
      lastname
      averageCompletition {
        projectAcp
        projectPacp
        stageAcp
        stagePacp
      }
    }
  }
`
export const USERS_FOR_SELECT = gql`
  query usersForSelect {
    users {
      id
      firstname
      lastname
      fullname
    }
  }
`
export const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstname
      lastname
      fullname
      email
      phone
      image
      roleId
      role {
        id
        name
      }
    }
  }
`

export const GET_COUNT_USER_ASSIGNATIONS = gql`
  query countUserAssignations {
    countUserAssignations
  }
`

export const GET_USER_VIEW_PROJECT = gql`
  query userViewProject($projectId: Int!) {
    userViewProject(projectId: $projectId)
  }
`

export const GET_USER_VIEW_STAGE = gql`
  query userViewStage($stageId: Int!) {
    userViewStage(stageId: $stageId)
  }
`

export const GET_USER_VIEW_AREA = gql`
  query userViewArea($areaId: Int!) {
    userViewArea(areaId: $areaId)
  }
`

export const USERS_VIEW_PROJECT = gql`
  query usersViewProject($projectId: Int!) {
    usersViewProject(projectId: $projectId) {
      id
      fullname
      email
      phone
      image
      roleId
    }
  }
`

export const USERS_VIEW_STAGE = gql`
  query usersViewStage($stageId: Int!) {
    usersViewStage(stageId: $stageId) {
      id
      fullname
      email
      phone
      image
      roleId
    }
  }
`

export const GET_USER_AREAS = gql`
  query userAreas($userId: Int!) {
    userAreas(userId: $userId) {
      id
      name
      averageCompletition {
        projectAcp
        projectPacp
        stageAcp
        stagePacp
      }
    }
  }
`
