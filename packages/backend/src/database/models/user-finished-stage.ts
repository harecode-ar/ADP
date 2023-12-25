import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class UserFinishedStage extends Model {
  public id!: number

  public userId!: number

  public stageId!: number
}

UserFinishedStage.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    stageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserFinishedStage',
    tableName: TABLES.USER_FINISHED_STAGE,
    timestamps: false,
    indexes: [
      {
        name: 'usr_fin_stg_ids_unique',
        unique: true,
        fields: ['userId', 'stageId'],
      },
    ],
  }
)
