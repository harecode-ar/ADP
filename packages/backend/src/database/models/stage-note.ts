import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class StageNote extends Model {
  public id!: number

  public message!: string

  public stageId!: number

  public userId!: number

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

StageNote.init(
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
    stageId: {
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
    modelName: 'StageNote',
    tableName: 'stage_notes',
    timestamps: true,
  }
)
