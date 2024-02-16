export default `#graphql
  type StageViewer {
    id: Int
    userId: Int
    stageId: Int
    
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createStageViewer(stageId: Int!, userId: Int!): StageViewer
    removeStageViewer(stageId: Int!, userId: Int!): StageViewer
  }
`
