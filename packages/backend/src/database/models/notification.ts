import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Notification extends Model {
  public id!: number

  public title!: string

  public category!: string

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: TABLES.NOTIFICATION,
  }
)
