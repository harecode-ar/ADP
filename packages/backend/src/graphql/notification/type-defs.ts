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
    readNotification(id: Int): Boolean
    unreadNotification(id: Int): Boolean
    readAllNotifications: Boolean
  }
`
