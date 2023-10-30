export default `#graphql
  type ProjectState {
    id: Int
    name: String
    description: String
  }

  type Query {
    projectStates: [ProjectState]
    projectState(id: ID, name: String): ProjectState
  }
`
