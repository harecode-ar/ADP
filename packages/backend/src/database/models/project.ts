import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Project extends Model {
  public id!: number

  public name!: string

  public description!: string

  public cost!: number

  public startDate!: string

  public endDate!: string

  public finishedAt!: string | null

  public progress!: number

  public acp!: number | null

  public pacp!: number | null

  public stateId!: number

  public areaId!: number | null

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Project.init(
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
    cost: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    finishedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    acp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    pacp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    areaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: TABLES.PROJECT,
    timestamps: true,
  }
)
