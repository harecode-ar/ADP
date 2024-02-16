export default `#graphql
  type ProjectViewer{
    id: Int
    userId: Int
    projectId: Int

    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createProjectVisualizer(projectId: Int!, userId: Int!): ProjectViewer
    removeProjectVisualizer(projectId: Int!, userId: Int!): ProjectViewer
  }
`
