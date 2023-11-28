import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class UserNotification extends Model {
  public id!: number

  public read!: boolean

  public userId!: number

  public notificationId!: number

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

UserNotification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    notificationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserNotification',
    tableName: 'users_notifications',
  }
)
