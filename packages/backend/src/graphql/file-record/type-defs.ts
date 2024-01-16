export default `#graphql
  type FileRecord {
    id: Int
    originalName: String
    fileName: String
    mimeType: String
    size: Int
    userId: Int

    createdAt: String
    updatedAt: String
    deletedAt: String

    user: User
  }
`
