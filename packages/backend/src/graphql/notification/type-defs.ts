export default `#graphql
  type Notification {
    id: Int
    title: String
    category: String

    createdAt: String
    updatedAt: String

    read: Boolean
  }

  type Query {
    notifications: [Notification]
  }

  type Mutation {
    readNotifications(ids: [Int]): Boolean
    unreadNotifications(ids: [Int]): Boolean
    removeNotifications(ids: [Int]): Boolean
  }
`
