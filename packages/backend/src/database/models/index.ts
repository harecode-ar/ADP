import { AreaAverageCompletition } from './area-average-completition'
import { Area } from './area'
import { Cache } from './cache'
import { Check } from './check'
import { Checklist } from './checklist'
import { Configuration } from './configuration'
import { ContactProject } from './contact-project'
import { ContactStage } from './contact-stage'
import { ContactUser } from './contact-user'
import { Contact } from './contact'
import { Notification } from './notification'
import { Permission } from './permission'
import { ProjectNote } from './project-note'
import { ProjectState } from './project-state'
import { Project } from './project'
import { RolePermission } from './role-permission'
import { Role } from './role'
import { Session } from './session'
import { StageNote } from './stage-note'
import { StageState } from './stage-state'
import { Stage } from './stage'
import { Token } from './token'
import { UserAverageCompletition } from './user-average-completition'
import { UserNotification } from './user-notification'
import { User } from './user'

Role.hasMany(User, { as: 'users', foreignKey: 'roleId' })
User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' })

User.hasMany(Session, { as: 'sessions', foreignKey: 'userId' })
Session.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Role.belongsToMany(Permission, { as: 'permissions', through: RolePermission, foreignKey: 'roleId' })
Permission.belongsToMany(Role, { as: 'roles', through: RolePermission, foreignKey: 'permissionId' })

User.hasMany(Token, { as: 'tokens', foreignKey: 'userId' })
Token.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Area.hasMany(Area, { as: 'children', foreignKey: 'parentId' })
Area.belongsTo(Area, { as: 'parent', foreignKey: 'parentId' })

User.hasMany(Area, { as: 'areas', foreignKey: 'responsibleId' })
Area.belongsTo(User, { as: 'responsible', foreignKey: 'responsibleId' })

Area.hasMany(Project, { as: 'projects', foreignKey: 'areaId' })
Project.belongsTo(Area, { as: 'area', foreignKey: 'areaId' })

Area.hasMany(Stage, { as: 'stages', foreignKey: 'areaId' })
Stage.belongsTo(Area, { as: 'area', foreignKey: 'areaId' })

Project.hasMany(Stage, { as: 'stages', foreignKey: 'projectId' })
Stage.belongsTo(Project, { as: 'project', foreignKey: 'projectId' })

ProjectState.hasMany(Project, { as: 'projects', foreignKey: 'stateId' })
Project.belongsTo(ProjectState, { as: 'state', foreignKey: 'stateId' })

Stage.hasMany(Stage, { as: 'childStages', foreignKey: 'parentStageId' })
Stage.belongsTo(Stage, { as: 'parentStage', foreignKey: 'parentStageId' })

StageState.hasMany(Stage, { as: 'stages', foreignKey: 'stateId' })
Stage.belongsTo(StageState, { as: 'state', foreignKey: 'stateId' })

Project.hasMany(ProjectNote, { as: 'notes', foreignKey: 'projectId' })
ProjectNote.belongsTo(Project, { as: 'project', foreignKey: 'projectId' })

Stage.hasMany(StageNote, { as: 'notes', foreignKey: 'stageId' })
StageNote.belongsTo(Stage, { as: 'stage', foreignKey: 'stageId' })

User.hasMany(ProjectNote, { as: 'projectNotes', foreignKey: 'userId' })
ProjectNote.belongsTo(User, { as: 'user', foreignKey: 'userId' })

User.hasMany(StageNote, { as: 'stageNotes', foreignKey: 'userId' })
StageNote.belongsTo(User, { as: 'user', foreignKey: 'userId' })

User.belongsToMany(Notification, {
  as: 'notifications',
  through: UserNotification,
  foreignKey: 'userId',
})
Notification.belongsToMany(User, {
  as: 'users',
  through: UserNotification,
  foreignKey: 'notificationId',
})

User.hasMany(UserNotification, { as: 'userNotifications', foreignKey: 'userId' })
UserNotification.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Notification.hasMany(UserNotification, { as: 'userNotifications', foreignKey: 'notificationId' })
UserNotification.belongsTo(Notification, { as: 'notification', foreignKey: 'notificationId' })

Contact.belongsToMany(Project, { as: 'projects', through: ContactProject, foreignKey: 'contactId' })
Project.belongsToMany(Contact, { as: 'contacts', through: ContactProject, foreignKey: 'projectId' })

Contact.belongsToMany(Stage, { as: 'stages', through: ContactStage, foreignKey: 'contactId' })
Stage.belongsToMany(Contact, { as: 'contacts', through: ContactStage, foreignKey: 'stageId' })

Contact.belongsToMany(User, { as: 'users', through: ContactUser, foreignKey: 'contactId' })
User.belongsToMany(Contact, { as: 'contacts', through: ContactUser, foreignKey: 'userId' })

Checklist.hasMany(Check, { as: 'checks', foreignKey: 'checklistId' })
Check.belongsTo(Checklist, { as: 'checklist', foreignKey: 'checklistId' })

User.hasMany(Checklist, { as: 'checklists', foreignKey: 'userId' })
Checklist.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Stage.hasMany(Checklist, { as: 'checklists', foreignKey: 'checklistId' })
Checklist.belongsTo(Stage, { as: 'stage', foreignKey: 'checklistId' })

Project.hasMany(Checklist, { as: 'checklists', foreignKey: 'checklistId' })
Checklist.belongsTo(Project, { as: 'project', foreignKey: 'checklistId' })

AreaAverageCompletition.hasOne(Area, { as: 'area', foreignKey: 'areaId' })
Area.belongsTo(AreaAverageCompletition, { as: 'averageCompletition', foreignKey: 'areaId' })

UserAverageCompletition.hasOne(User, { as: 'user', foreignKey: 'userId' })
User.belongsTo(UserAverageCompletition, { as: 'averageCompletition', foreignKey: 'userId' })

export {
  AreaAverageCompletition,
  Area,
  Cache,
  Check,
  Checklist,
  Configuration,
  ContactProject,
  ContactStage,
  ContactUser,
  Contact,
  Notification,
  Permission,
  ProjectNote,
  ProjectState,
  Project,
  RolePermission,
  Role,
  Session,
  StageNote,
  StageState,
  Stage,
  Token,
  UserAverageCompletition,
  UserNotification,
  User,
}
