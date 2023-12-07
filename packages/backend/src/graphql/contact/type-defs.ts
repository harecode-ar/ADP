export default `#graphql
  type Contact {
    id: Int
    name: String
    phone: String
    email: String
    image: String

    createdAt: String
    updatedAt: String

    users: [User]
    stages: [Stage]
    projects: [Project]
  }

  type Query {
    userContacts: [Contact]
    contact(id: ID): Contact
    stageContacts(id: ID): [Contact]
    projectContacts(id: ID): [Contact]
  }

  type Mutation {
    createContact(name: String!, phone: String!, email: String, image: Upload): Contact
    createStageContact(stageId: Int!, name: String!, phone: String!, email: String, image: Upload): Contact
    updateContact(id: ID!, name: String, phone: String, email: String, image: Upload): Contact
    deleteUserContact(id: ID!): Boolean
    deleteStageContact(id: Int!, stageId: Int!): Boolean
  }
`
