import { gql } from '@apollo/client'

export const GET_USER_ASSIGNMENTS = gql`
  query userAssignments($stateId: Int) {
    userProjects(stateId: $stateId) {
      id
      name
      description
      startDate
      endDate
      progress
      acp
      pacp
      stateId
    }
    userStages(stateId: $stateId) {
      id
      name
      description
      startDate
      endDate
      progress
      acp
      pacp
      stateId
      hasStages
    }
    userSubStages(stateId: $stateId) {
      id
      name
      description
      startDate
      endDate
      progress
      acp
      pacp
      stateId
    }
  }
`
export const GET_USER_ASSIGNMENTS_FOR_LIST = gql`
  query userAssignments($stateId: Int) {
    userProjects(stateId: $stateId) {
      id
      name
    }
    userStages(stateId: $stateId) {
      id
      name
    }
    userSubStages(stateId: $stateId) {
      id
      name
    }
  }
`