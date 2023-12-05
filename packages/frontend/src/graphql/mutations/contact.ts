import { gql } from '@apollo/client'

export const CREATE_CONTACT = gql`
  mutation createContact($name: String!, $phone: String!, $image: Upload) {
    createContact(name: $name, phone: $phone, image: $image) {
      id
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: ID!, $name: String, $phone: String, $image: Upload) {
    updateContact(id: $id, name: $name, phone: $phone, image: $image) {
      id
    }
  }
`
