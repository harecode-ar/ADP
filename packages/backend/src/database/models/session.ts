import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class Session extends Model {
  public id!: number

  public userAgent!: string

  public userId!: number

  public createdAt!: Date

  public updatedAt!: Date

  public deletedAt!: Date | null
}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.SESSION,
    tableName: TABLES.SESSION,
    timestamps: true,
    paranoid: true,
  }
)
