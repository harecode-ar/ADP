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
      acp
      pacp
      stateId
    }
    userStages {
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
    userSubStages {
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
