export default `#graphql
  type ProjectAreaReport {
    new: Int
    inProgress: Int
    completed: Int
    cancelled: Int
  }

  type ProjectCostAreaReport {
    new: Float
    inProgress: Float
    completed: Float
    cancelled: Float
  }

  type ProjectMinMaxDate {
    minDate: String
    maxDate: String
  }

  type Query {
    projectCountByState(areas: [Int!]!, startDate: String, endDate: String): ProjectAreaReport
    projectCostByState(areas: [Int!]!, startDate: String, endDate: String): ProjectCostAreaReport
    projectMinMaxDate: ProjectMinMaxDate
  }

`
