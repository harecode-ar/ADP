import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import session from './session'
import role from './role'
import permission from './permission'
import user from './user'

export const typeDefs = mergeTypeDefs([
  session.typeDefs,
  role.typeDefs,
  permission.typeDefs,
  user.typeDefs,
])

export const resolvers = mergeResolvers([
  session.resolvers,
  role.resolvers,
  permission.resolvers,
  user.resolvers,
])

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
