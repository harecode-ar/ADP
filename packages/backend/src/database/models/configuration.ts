import { EConfigurationKey } from '@adp/shared'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Configuration extends Model {
  public id!: number

  public key!: EConfigurationKey

  public value!: string

  public description!: string

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Configuration.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    value: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Configuration',
    tableName: TABLES.CONFIGURATION,
  }
)
