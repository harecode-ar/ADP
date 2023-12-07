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

export const GET_CONTACT = gql`
  query contact($id: ID) {
    contact(id: $id) {
      id
      name
      phone
      image
    }
  }
`
