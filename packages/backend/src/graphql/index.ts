import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import session from './session'
import role from './role'
import permission from './permission'
import user from './user'
import area from './area'
import project from './project'
import projectState from './project-state'
import projectNote from './project-note'
import stage from './stage'
import stageState from './stage-state'

export const typeDefs = mergeTypeDefs([
  session.typeDefs,
  role.typeDefs,
  permission.typeDefs,
  user.typeDefs,
  area.typeDefs,
  project.typeDefs,
  projectState.typeDefs,
  projectNote.typeDefs,
  stage.typeDefs,
  stageState.typeDefs,
])

export const resolvers = mergeResolvers([
  session.resolvers,
  role.resolvers,
  permission.resolvers,
  user.resolvers,
  area.resolvers,
  project.resolvers,
  projectState.resolvers,
  projectNote.resolvers,
  stage.resolvers,
  stageState.resolvers,
])

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
