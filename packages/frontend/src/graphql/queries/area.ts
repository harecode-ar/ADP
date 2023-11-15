import { gql } from '@apollo/client'

export const AREAS_FOR_LIST = gql`
  query areasForList {
    areas {
      id
      name
      rolename
      description
      multiple

      responsible {
        id
        email
        fullname
        image
      }
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
        image
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
      color
      multiple
      responsible {
        id
        email
        fullname
        image
      }
      parent {
        id
        name
      }
    }
  }
`
