import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class UserAverageCompletition extends Model {
  public id!: number

  public projectAcp!: number | null

  public projectPacp!: number | null

  public stageAcp!: number | null

  public stagePacp!: number | null

  public userId!: number
}

UserAverageCompletition.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    projectAcp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    projectPacp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stageAcp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stagePacp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.USER_AVERAGE_COMPLETITION,
    tableName: TABLES.USER_AVERAGE_COMPLETITION,
    timestamps: false,
  }
)
