import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import areaAverageCompletition from './area-average-completition'
import area from './area'
import check from './check'
import checklist from './checklist'
import configuration from './configuration'
import contact from './contact'
import notification from './notification'
import permission from './permission'
import project from './project'
import projectNote from './project-note'
import report from './report'
import role from './role'
import session from './session'
import stage from './stage'
import stageNote from './stage-note'
import taskState from './task-state'
import upload from './upload'
import user from './user'
import userAverageCompletition from './user-average-completition'

export const typeDefs = mergeTypeDefs([
  areaAverageCompletition.typeDefs,
  area.typeDefs,
  check.typeDefs,
  checklist.typeDefs,
  configuration.typeDefs,
  contact.typeDefs,
  notification.typeDefs,
  permission.typeDefs,
  project.typeDefs,
  projectNote.typeDefs,
  report.typeDefs,
  role.typeDefs,
  session.typeDefs,
  stage.typeDefs,
  stageNote.typeDefs,
  taskState.typeDefs,
  upload.typeDefs,
  user.typeDefs,
  userAverageCompletition.typeDefs,
])

export const resolvers = mergeResolvers([
  areaAverageCompletition.resolvers,
  area.resolvers,
  check.resolvers,
  checklist.resolvers,
  configuration.resolvers,
  contact.resolvers,
  notification.resolvers,
  permission.resolvers,
  project.resolvers,
  projectNote.resolvers,
  report.resolvers,
  role.resolvers,
  session.resolvers,
  stage.resolvers,
  stageNote.resolvers,
  taskState.resolvers,
  upload.resolvers,
  user.resolvers,
  userAverageCompletition.resolvers,
])

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
