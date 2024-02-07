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
