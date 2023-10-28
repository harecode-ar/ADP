import { gql } from '@apollo/client'

export const AREAS_FOR_LIST = gql`
  query areasForList {
    areas {
      id
      name
      rolename
      description
      multiple
    }
  }
`
export const AREAS_FOR_SELECT = gql`
  query areasForSelect {
    areas {
      id
      name
    }
  }
`

export const GET_AREAS_FOR_TREE = gql`
  query areasForTree {
    areas {
      id
      name
      parentId
      responsible {
        id
        email
        fullname
      }
    }
  }
`

export const GET_AREA = gql`
  query area($id: Int!) {
    area(id: $id) {
      id
      name
      rolename
      description
      multiple
      responsible {
        id
        email
        fullname
      }
      parent {
        id
        name
      }
    }
  }
`
