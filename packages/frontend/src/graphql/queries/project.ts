import { gql } from '@apollo/client'

export const PROJECTS_FOR_LIST = gql`
  query projectsForList {
    projects {
      id
      name
      progress
      area {
        id
        name
      }
      responsible {
        id
        fullname
      }
      state {
        id
        name
      }
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

export const GET_PROJECT = gql`
  query project($id: Int!) {
    project(id: $id) {
      id
      name
      description
      cost
      startDate
      endDate
      progress
      area {
        id
        name
      }
      responsible {
        id
        fullname
      }
      state {
        id
        name
      }
    }
  }
`
