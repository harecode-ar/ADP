import { gql } from '@apollo/client'

export const GET_CONFIGURATIONS = gql`
  query configurations {
    configurations {
      key
      value
    }
  }
`
