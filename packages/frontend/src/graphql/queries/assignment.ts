import { gql } from '@apollo/client'

export const GET_USER_ASSIGNMENTS = gql`
  query userAssignments {
    userProjects {
      id
      name
      description
      startDate
      endDate
      progress
      stateId
    }
    userStages {
      id
      name
      description
      startDate
      endDate
      progress
      stateId
      hasStages
    }
    userSubStages {
      id
      name
      description
      startDate
      endDate
      progress
      stateId
    }
  }
`
