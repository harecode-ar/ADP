import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class UserFinishedProject extends Model {
  public id!: number

  public userId!: number

  public projectId!: number
}

UserFinishedProject.init(
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
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.USER_FINISHED_PROJECT,
    tableName: TABLES.USER_FINISHED_PROJECT,
    timestamps: false,
    indexes: [
      {
        name: 'usr_fin_pjc_ids_unique',
        unique: true,
        fields: ['userId', 'projectId'],
      },
    ],
  }
)
