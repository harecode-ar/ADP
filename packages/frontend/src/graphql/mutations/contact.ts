import { gql } from '@apollo/client'

export const CREATE_CONTACT = gql`
  mutation createContact($name: String!, $phone: String!, $image: Upload) {
    createContact(name: $name, phone: $phone, image: $image) {
      id
    }
  }
`
