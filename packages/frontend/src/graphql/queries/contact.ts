import { gql } from '@apollo/client'

export const GET_USER_CONTACTS = gql`
  query userContacts {
    userContacts {
      id
      name
      phone
      image
    }
  }
`
