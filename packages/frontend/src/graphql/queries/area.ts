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

export const GET_AREAS_FOR_DASHBOARD = gql`
  query areasForDashboard {
    areasForDashboard {
      id
      name
      description
      rolename
      responsible {
        id
        fullname
        image
      }
      averageCompletition {
        projectAcp
        projectPacp
      }
    }
  }
`

export const GET_USER_AREAS_FOR_SELECT = gql`
  query userAreasForSelect {
    userAreasForSelect {
      id
      name
    }
  }
`

export const GET_AREAS_TREE = gql`
  query areaTree($areaId: Int!) {
    areaTree(areaId: $areaId) {
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

export const GET_DIRECT_AREA_DESCENDANTS = gql`
  query directAreaDescendants($areaId: Int!) {
    directAreaDescendants(areaId: $areaId) {
      id
      name
      projects {
        id
      }
    }
  }
`
