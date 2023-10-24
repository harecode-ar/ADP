import { gql } from '@apollo/client'

export const CREATE_AREA = gql`
  mutation createArea(
    $name: String!
    $description: String!
    $rolename: String!
    $multiple: Boolean!
  ) {
    createArea(name: $name, description: $description, rolename: $rolename, multiple: $multiple) {
      id
    }
  }
`

export const UPDATE_AREA = gql`
  mutation updateArea(
    $id: ID!
    $name: String!
    $description: String!
    $rolename: String!
    $multiple: Boolean!
  ) {
    updateArea(
      id: $id
      name: $name
      description: $description
      rolename: $rolename
      multiple: $multiple
    ) {
      id
    }
  }
`

export const DELETE_AREA = gql`
  mutation deleteArea($id: Int!) {
    deleteArea(id: $id) {
      id
    }
  }
`
