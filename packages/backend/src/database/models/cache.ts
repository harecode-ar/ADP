import { ECacheKey } from '@adp/shared'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class Cache extends Model {
  public id!: number

  public key!: ECacheKey

  public value!: string

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

Cache.init(
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
    modelName: MODELS.CACHE,
    tableName: TABLES.CACHE,
  }
)
