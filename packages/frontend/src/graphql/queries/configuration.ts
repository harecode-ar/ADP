import { gql } from '@apollo/client'

export const GET_CONFIGURATION = gql`
  query configuration($key: String!) {
    configuration(key: $key)
  }
`

export const GET_CONFIGURATIONS = gql`
  query configurations {
    configurations {
      key
      value
      description
    }
  }
`
