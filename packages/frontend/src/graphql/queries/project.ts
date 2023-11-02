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

      area {
        id
        name
      }

      responsible {
        id
        fullname
      }

      stages {
        id
      }
    }
  }
`
