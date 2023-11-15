import { gql } from '@apollo/client'

export const GET_SESSION = gql`
  query getSession {
    getSession {
      id

      user {
        id
        firstname
        lastname
        fullname
        email
        image

        role {
          id
          name

          permissions {
            id
            name
          }
        }
      }
    }
  }
`
