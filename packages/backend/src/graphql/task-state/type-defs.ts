export default `#graphql
  type TaskState {
    id: Int
    name: String
  }

  type Query {
    taskStates: [TaskState]
    taskState(id: ID, name: String): TaskState
  }
`
