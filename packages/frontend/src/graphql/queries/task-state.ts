import { gql } from '@apollo/client'

export const TASK_STATE_FOR_SELECT = gql`
  query taskStateForSelect {
    taskStates {
      id
      name
    }
  }
`
