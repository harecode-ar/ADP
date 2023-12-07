import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'

export class Contact extends Model {
  public id!: number

  public name!: string

  public phone!: string

  public email!: string | null

  public image!: string | null

  public createdAt!: string

  public updatedAt!: string

  public deletedAt!: string | null
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true,
    paranoid: true,
  }
)
