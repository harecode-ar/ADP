import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class RolePermission extends Model {
  public id!: number

  public roleId!: number

  public permissionId!: number
}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'roles_permissions',
  }
)
