import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import upload from './upload'
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
import stageNote from './stage-note'
import report from './report'
import notification from './notification'
import contact from './contact'

export const typeDefs = mergeTypeDefs([
  upload.typeDefs,
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
  stageNote.typeDefs,
  report.typeDefs,
  notification.typeDefs,
  contact.typeDefs,
])

export const resolvers = mergeResolvers([
  upload.resolvers,
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
  stageNote.resolvers,
  report.resolvers,
  notification.resolvers,
  contact.resolvers,
])

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
