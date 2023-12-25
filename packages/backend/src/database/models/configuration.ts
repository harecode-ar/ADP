import { EConfigurationKey, EConfigurationValue } from '@adp/shared'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Configuration extends Model {
  public id!: number

  public key!: EConfigurationKey

  public value!: EConfigurationValue

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
  },
  {
    sequelize,
    modelName: 'Configuration',
    tableName: TABLES.CONFIGURATION,
  }
)
