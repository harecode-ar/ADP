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
      state {
        id
        name
      }
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
      state {
        id
        name
      }
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
      state {
        id
        name
      }
    }
  }
`
