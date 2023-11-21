export default `#graphql
  type StageNote {
    id: Int
    message: String
    stageId: Int
    userId: Int

    createdAt: String
    updatedAt: String

    user: User
  }

  type Query {
    stageNotes(stageId: Int!): [StageNote]
  }

  type Mutation {
    createStageNote(
      message: String!
      stageId: Int!
    ): StageNote

    deleteStageNote(id: Int!): StageNote
  }

`
