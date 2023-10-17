import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class Role extends Model {
  public id!: number

  public name!: string
}

Role.init(
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
    modelName: 'Role',
    tableName: 'roles',
  }
)
