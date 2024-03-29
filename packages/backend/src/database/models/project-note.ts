import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class ProjectNote extends Model {
  public id!: number

  public message!: string

  public projectId!: number

  public userId!: number

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

ProjectNote.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.PROJECT_NOTE,
    tableName: TABLES.PROJECT_NOTE,
    timestamps: true,
  }
)
