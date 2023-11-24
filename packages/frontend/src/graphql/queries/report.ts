import { gql } from '@apollo/client'

export const PROJECT_AREA_REPORT = gql`
  query projectAreaReport($areaId: Int!) {
    projectAreaReport(areaId: $areaId) {
      new
      inProgress
      completed
      cancelled
    }
  }
`
