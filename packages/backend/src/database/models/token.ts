import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class Token extends Model {
  public id!: number

  public token!: string

  public type!: string

  public userId!: number

  public createdAt!: Date

  public updatedAt!: Date
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
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
    modelName: MODELS.TOKEN,
    tableName: TABLES.TOKEN,
    timestamps: true,
  }
)
