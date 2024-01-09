import { gql } from '@apollo/client'

export const UPDATE_CONFIGURATIONS = gql`
  mutation updateConfigurations($input: [ConfigurationInput!]!) {
    updateConfigurations(input: $input) {
      key
      value
    }
  }
`
