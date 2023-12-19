import { gql } from '@apollo/client'

export const GET_PROJECTS_BY_AREA = gql`
  query projectsByArea($areaId: Int!) {
    projectsByArea(areaId: $areaId) {
      id
      name
      description
      progress
      cost
      startDate
      endDate

      state {
        id
        name
      }

      responsible {
        id
        fullname
      }

      area {
        id
        name
      }

      stages {
        id
        name
      }
    }
  }
`

export const GET_IN_PROGRESS_PROJECTS_BY_AREA = gql`
  query inProgressProjectsByArea($areaId: Int!) {
    inProgressProjectsByArea(areaId: $areaId) {
      id
      name
      description
      progress
      cost
      startDate
      endDate

      state {
        id
        name
      }

      responsible {
        id
        fullname
      }

      area {
        id
        name
      }

      stages {
        id
        name
        startDate
        endDate
        progress
      }
    }
  }
`

export const GET_PROJECTS_BY_AREA_AND_STATE = gql`
  query projectsByAreaAndState($areaId: Int!, $stateId: Int) {
    projectsByAreaAndState(areaId: $areaId, stateId: $stateId) {
      id
      name
      description
      progress
      cost
      startDate
      endDate

      state {
        id
        name
      }

      responsible {
        id
        fullname
      }

      area {
        id
        name
      }

      stages {
        id
        name
        startDate
        endDate
        progress
      }
    }
  }
`

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

export const GET_COUNT_PROJECTS_BY_AREA = gql`
  query countProjectsByArea($areaId: Int!) {
    countProjectsByArea(areaId: $areaId)
  }
`
