import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class Project extends Model {
  public id!: number

  public name!: string

  public description!: string

  public cost!: string

  public startDate!: string

  public endDate!: string

  public progress!: number

  public stateId!: number

  public areaId!: number | null

  public responsibleId!: number | null

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
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    progress: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    stateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    areaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    responsibleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
  }
)
