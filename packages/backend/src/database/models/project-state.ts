import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class ProjectState extends Model {
  public id!: number

  public name!: string

  public description!: string
}

ProjectState.init(
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
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'ProjectState',
    tableName: TABLES.PROJECT_STATE,
  }
)
