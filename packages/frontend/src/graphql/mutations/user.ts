import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $telephone: String!
    $password: String!
    $roleId: Int!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      telephone: $telephone
      password: $password
      roleId: $roleId
    ) {
      id
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $firstname: String!
    $lastname: String!
    $email: String!
    $telephone: String!
    $password: String!
    $roleId: Int!
  ) {
    updateUser(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
      telephone: $telephone
      password: $password
      roleId: $roleId
    ) {
      id
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
