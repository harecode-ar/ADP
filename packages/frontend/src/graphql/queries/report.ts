import { gql } from '@apollo/client'

export const GET_PROJECT_COUNT_BY_STATE = gql`
  query projectCountByState($areas: [Int!]!, $startDate: String, $endDate: String) {
    projectCountByState(areas: $areas, startDate: $startDate, endDate: $endDate) {
      new
      inProgress
      completed
      cancelled
    }
  }
`

export const GET_PROJECT_COST_BY_STATE = gql`
  query projectCostByState($areas: [Int!]!, $startDate: String, $endDate: String) {
    projectCostByState(areas: $areas, startDate: $startDate, endDate: $endDate) {
      new
      inProgress
      completed
      cancelled
    }
  }
`

export const GET_PROJECT_MIN_MAX_DATE = gql`
  query projectMinMaxDate {
    projectMinMaxDate {
      minDate
      maxDate
    }
  }
`
