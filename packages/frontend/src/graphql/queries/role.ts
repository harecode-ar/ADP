import { gql } from '@apollo/client'

export const GET_ROLES_FOR_SELECT = gql`
  query rolesForSelect {
    roles {
      id
      name
    }
  }
`
