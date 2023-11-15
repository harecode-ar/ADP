import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
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
