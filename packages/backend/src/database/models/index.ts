import { Permission } from './permission'
import { Role } from './role'
import { RolePermission } from './role-permission'
import { Session } from './session'
import { User } from './user'

Role.hasMany(User, { as: 'users', foreignKey: 'roleId' })
User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' })

User.hasMany(Session, { as: 'sessions', foreignKey: 'userId' })
Session.belongsTo(User, { as: 'user', foreignKey: 'userId' })

Role.belongsToMany(Permission, { as: 'permissions', through: RolePermission, foreignKey: 'roleId' })
Permission.belongsToMany(Role, { as: 'roles', through: RolePermission, foreignKey: 'permissionId' })

export { Permission, Role, RolePermission, Session, User }
