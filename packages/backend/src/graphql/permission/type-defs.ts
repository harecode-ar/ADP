export default `#graphql
  type Permission {
    id: Int
    name: String
  }

  type Query {
    permissions: [Permission]
    permission(id: ID, name: String): Permission
  }
`
