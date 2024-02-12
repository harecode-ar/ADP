export default `#graphql
  type Mutation {
    startTask(projectId: Int, stageId: Int): Boolean
    finishTask(projectId: Int, stageId: Int): Boolean
  }
`
