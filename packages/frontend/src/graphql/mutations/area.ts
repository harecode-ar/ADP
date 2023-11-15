import { gql } from '@apollo/client'

export const CREATE_AREA = gql`
  mutation createArea(
    $name: String!
    $description: String!
    $color: String!
    $rolename: String!
    $multiple: Boolean!
    $parentId: Int
    $responsibleId: Int
  ) {
    createArea(
      name: $name
      description: $description
      color: $color
      rolename: $rolename
      multiple: $multiple
      parentId: $parentId
      responsibleId: $responsibleId
    ) {
      id
    }
  }
`

export const UPDATE_AREA = gql`
  mutation updateArea(
    $id: Int!
    $name: String!
    $description: String!
    $color: String!
    $rolename: String!
    $multiple: Boolean!
    $parentId: Int
    $responsibleId: Int
  ) {
    updateArea(
      id: $id
      name: $name
      description: $description
      color: $color
      rolename: $rolename
      multiple: $multiple
      parentId: $parentId
      responsibleId: $responsibleId
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
