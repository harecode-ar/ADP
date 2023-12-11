export default `#graphql
  type ProjectAreaReport {
    new: Int
    inProgress: Int
    completed: Int
    cancelled: Int
  }

  type Query {
    projectCountByState(areas: [Int!]!, startDate: String, endDate: String): ProjectAreaReport
  }

`
