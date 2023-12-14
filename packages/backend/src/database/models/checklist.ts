import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Checklist extends Model {
  public id!: number

  public title!: string

  public userId!: number

  public stageId!: number | null

  public projectId!: number | null

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Checklist.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    stageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Checklist',
    tableName: TABLES.CHECKLIST,
    timestamps: true,
  }
)
