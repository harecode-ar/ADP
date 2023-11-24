export default `#graphql
  type ProjectAreaReport {
    new: Int
    inProgress: Int
    completed: Int
    cancelled: Int
  }

  type Query {
    projectAreaReport(areaId: Int!): ProjectAreaReport
  }

`
