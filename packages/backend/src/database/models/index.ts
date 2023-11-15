import { Permission } from './permission'
import { Role } from './role'
import { RolePermission } from './role-permission'
import { Session } from './session'
import { User } from './user'
import { Area } from './area'
import { Token } from './token'
import { Project } from './project'
import { ProjectState } from './project-state'
import { Stage } from './stage'
import { StageState } from './stage-state'
import { ProjectNote } from './project-note'

Role.hasMany(User, { as: 'users', foreignKey: 'roleId' })
User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' })

User.hasMany(Session, { as: 'sessions', foreignKey: 'userId' })
Session.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Role.belongsToMany(Permission, { as: 'permissions', through: RolePermission, foreignKey: 'roleId' })
Permission.belongsToMany(Role, { as: 'roles', through: RolePermission, foreignKey: 'permissionId' })

User.hasMany(Token, { as: 'tokens', foreignKey: 'userId' })
Token.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Area.hasMany(Area, { as: 'childAreas', foreignKey: 'parentId' })
Area.belongsTo(Area, { as: 'parent', foreignKey: 'parentId' })

User.hasOne(Area, { as: 'areas', foreignKey: 'responsibleId' })
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

User.hasMany(ProjectNote, { as: 'notes', foreignKey: 'userId' })
ProjectNote.belongsTo(User, { as: 'user', foreignKey: 'userId' })

export {
  Permission,
  Role,
  RolePermission,
  Session,
  User,
  Area,
  Token,
  Project,
  ProjectState,
  ProjectNote,
  Stage,
  StageState,
}
