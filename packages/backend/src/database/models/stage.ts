import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Stage extends Model {
  public id!: number

  public name!: string

  public description!: string

  public startDate!: string

  public endDate!: string

  public finishedAt!: string | null

  public progress!: number

  public hasStages!: boolean

  public stateId!: number

  public areaId!: number | null

  public projectId!: number

  public parentStageId!: number | null

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Stage.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    finishedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    hasStages: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    stateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    areaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    parentStageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Stage',
    tableName: TABLES.STAGE,
    timestamps: true,
  }
)
