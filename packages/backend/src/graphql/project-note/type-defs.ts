export default `#graphql
  type ProjectNote {
    id: Int
    message: String
    projectId: Int
    userId: Int

    createdAt: String
    updatedAt: String

    user: User
    files: [FileRecord]
  }

  type Query {
    projectNotes(projectId: Int!): [ProjectNote]
  }

  type Mutation {
    createProjectNote(
      message: String!
      projectId: Int!
      files: [Upload]
    ): ProjectNote

    deleteProjectNote(id: Int!): ProjectNote
  }

`
