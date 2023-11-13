import { gql } from '@apollo/client'

export const PROJECT_STATE_FOR_SELECT = gql`
  query projectStateForSelect {
    projectStates {
      id
      name
    }
  }
`
