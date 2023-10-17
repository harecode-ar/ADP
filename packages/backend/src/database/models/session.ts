import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

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
    modelName: 'Session',
    tableName: 'sessions',
    timestamps: true,
    paranoid: true,
  }
)
