import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class ContactUser extends Model {
  public id!: number

  public contactId!: number

  public userId!: number
}

ContactUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    contactId: {
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
    modelName: 'ContactUser',
    tableName: TABLES.CONTACT_USER,
  }
)
