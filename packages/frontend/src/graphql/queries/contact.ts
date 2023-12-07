import { gql } from '@apollo/client'

export const GET_USER_CONTACTS = gql`
  query userContacts {
    userContacts {
      id
      name
      phone
      email
      image
    }
  }
`

export const GET_STAGE_CONTACTS = gql`
  query stageContacts($id: ID) {
    stageContacts(id: $id) {
      id
      name
      phone
      email
      image
    }
  }
`

export const GET_PROJECT_CONTACTS = gql`
  query projectContacts($id: ID) {
    projectContacts(id: $id) {
      id
      name
      phone
      email
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
      email
      image
    }
  }
`
