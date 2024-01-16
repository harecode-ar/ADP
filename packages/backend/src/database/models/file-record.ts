import { TMimeType } from '@adp/shared'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class FileRecord extends Model {
  public id!: number

  public originalName!: string

  public filename!: string

  public mimeType!: TMimeType

  public size!: number

  public userId!: number

  public readonly createdAt!: string

  public readonly updatedAt!: string

  public readonly deletedAt!: string | null
}

FileRecord.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.FILE_RECORD,
    tableName: TABLES.FILE_RECORD,
    timestamps: true,
    paranoid: true,
  }
)
