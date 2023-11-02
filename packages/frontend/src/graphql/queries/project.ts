import { gql } from '@apollo/client'

export const PROJECTS_FOR_LIST = gql`
  query projectsForList {
    projects {
      id
      name
      description
      areaId
      cost
      startDate
      endDate
    }
  }
`
export const PROJECTS_FOR_SELECT = gql`
  query projectsForSelect {
    projects {
      id
      name
    }
  }
`

export const GET_PROJECTS_FOR_TREE = gql`
  query projectsForTree {
    projects {
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
export const GET_PROJECT = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
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
