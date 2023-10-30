import { gql } from '@apollo/client'

export const USERS_FOR_LIST = gql`
  query usersForList {
    users {
      id
      firstname
      lastname
      email
      telephone
      password
      roleId
    }
  }
`
export const USERS_FOR_SELECT = gql`
  query usersForSelect {
    users {
      id
      fullname
    }
  }
`
export const GET_USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
      telephone
      password
      roleId
    }
  }
`
