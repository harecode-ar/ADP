export default `#graphql
  type ProjectNote {
    id: Int
    message: String
    projectId: Int
  }

  type Mutation {
    createProjectNote(
      message: String!
      projectId: Int!
    ): ProjectNote
  }
`
