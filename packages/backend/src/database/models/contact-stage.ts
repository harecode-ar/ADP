import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class ContactStage extends Model {
  public id!: number

  public contactId!: number

  public stageId!: number
}

ContactStage.init(
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
    stageId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ContactStage',
    tableName: 'contacts_stages',
  }
)
