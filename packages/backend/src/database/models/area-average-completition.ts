import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class AreaAverageCompletition extends Model {
  public id!: number

  public projectAcp!: number | null

  public projectPacp!: number | null

  public stageAcp!: number | null

  public stagePacp!: number | null

  public areaId!: number

  public readonly createdAt!: string

  public readonly updatedAt!: string
}

AreaAverageCompletition.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    projectAcp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    projectPacp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stageAcp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stagePacp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    areaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.AREA_AVERAGE_COMPLETITION,
    tableName: TABLES.AREA_AVERAGE_COMPLETITION,
    timestamps: true,
  }
)
