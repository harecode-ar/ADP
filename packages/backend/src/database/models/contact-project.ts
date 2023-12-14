import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class ContactProject extends Model {
  public id!: number

  public contactId!: number

  public projectId!: number
}

ContactProject.init(
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
    projectId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ContactProject',
    tableName: TABLES.CONTACT_PROJECT,
  }
)
