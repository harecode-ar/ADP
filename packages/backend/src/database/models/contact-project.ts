import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

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
    tableName: 'contacts_projects',
  }
)
