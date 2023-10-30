export default `#graphql
  type StageState {
    id: Int
    name: String
    description: String
  }

  type Query {
    stageStates: [StageState]
    stageState(id: ID, name: String): StageState
  }
`
