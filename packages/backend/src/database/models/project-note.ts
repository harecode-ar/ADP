import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class ProjectNote extends Model {
  public id!: number

  public message!: string

  public projectId!: number
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
  },
  {
    sequelize,
    modelName: 'ProjectNote',
    tableName: 'project_notes',
    timestamps: true,
  }
)