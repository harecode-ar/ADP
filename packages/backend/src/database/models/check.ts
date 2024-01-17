import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class Check extends Model {
  public id!: number

  public title!: string

  public checked!: boolean

  public checklistId!: number

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Check.init(
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
    checked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    checklistId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.CHECK,
    tableName: TABLES.CHECK,
    timestamps: true,
  }
)
