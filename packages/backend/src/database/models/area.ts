import { COLORS } from '@adp/shared'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class Area extends Model {
  public id!: number

  public name!: string

  public rolename!: string

  public description!: string

  public color!: string

  public multiple!: boolean

  public parentId!: number | null

  public responsibleId!: number | null

  public createdAt!: string

  public updatedAt!: string

  public deletedAt!: string | null
}

Area.init(
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
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => COLORS[Math.floor(Math.random() * COLORS.length)].color,
    },
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    multiple: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    responsibleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Area',
    tableName: TABLES.AREA,
    timestamps: true,
    paranoid: true,
  }
)
