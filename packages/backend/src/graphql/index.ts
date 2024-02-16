import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import areaAverageCompletition from './area-average-completition'
import area from './area'
import check from './check'
import checklist from './checklist'
import configuration from './configuration'
import contact from './contact'
import cron from './cron'
import fileRecord from './file-record'
import notification from './notification'
import permission from './permission'
import project from './project'
import projectNote from './project-note'
import projectViewer from './project-viewer'
import report from './report'
import role from './role'
import session from './session'
import stage from './stage'
import stageNote from './stage-note'
import stageViewer from './stage-viewer'
import storage from './storage'
import task from './task'
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
  cron.typeDefs,
  fileRecord.typeDefs,
  notification.typeDefs,
  permission.typeDefs,
  project.typeDefs,
  projectNote.typeDefs,
  projectViewer.typeDefs,
  report.typeDefs,
  role.typeDefs,
  session.typeDefs,
  stage.typeDefs,
  stageNote.typeDefs,
  stageViewer.typeDefs,
  task.typeDefs,
  taskState.typeDefs,
  upload.typeDefs,
  storage.typeDefs,
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
  cron.resolvers,
  fileRecord.resolvers,
  notification.resolvers,
  permission.resolvers,
  project.resolvers,
  projectNote.resolvers,
  projectViewer.resolvers,
  report.resolvers,
  role.resolvers,
  session.resolvers,
  stage.resolvers,
  stageNote.resolvers,
  stageViewer.resolvers,
  storage.resolvers,
  task.resolvers,
  taskState.resolvers,
  upload.resolvers,
  user.resolvers,
  userAverageCompletition.resolvers,
])

export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
