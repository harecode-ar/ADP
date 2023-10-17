import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class Permission extends Model {
  public id!: number

  public name!: string
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
  }
)
