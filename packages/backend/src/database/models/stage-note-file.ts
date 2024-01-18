import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class StageNoteFile extends Model {
  public id!: number

  public stageNoteId!: number

  public fileRecordId!: number
}

StageNoteFile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    stageNoteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    fileRecordId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: MODELS.STAGE_NOTE_FILE,
    tableName: TABLES.STAGE_NOTE_FILE,
  }
)
