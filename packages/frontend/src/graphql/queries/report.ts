import { gql } from '@apollo/client'

export const GET_PROJECT_COUNT_BY_STATE = gql`
  query projectCountByState($areas: [Int!]!) {
    projectCountByState(areas: $areas) {
      new
      inProgress
      completed
      cancelled
    }
  }
`

export const GET_PROJECT_COST_BY_STATE = gql`
  query projectCostByState($areas: [Int!]!) {
    projectCostByState(areas: $areas) {
      new
      inProgress
      completed
      cancelled
    }
  }
`
