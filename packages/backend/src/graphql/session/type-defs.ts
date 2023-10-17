export default `#graphql
  type Session {
    id: Int
    userAgent: String
    userId: Int
    
    createdAt: String
    updatedAt: String

    token: String
    user: User
  }

  type Query {
    getSession: Session
    checkSession: Boolean
  }

  type Mutation {
    login(email: String!, password: String!): Session
    logout: Boolean
  }
`
