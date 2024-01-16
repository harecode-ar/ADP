import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { MODELS, TABLES } from '../../constants'

export class ProjectNoteFile extends Model {
  public id!: number

  public projectNoteId!: number

  public fileRecordId!: number
}

ProjectNoteFile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    projectNoteId: {
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
    modelName: MODELS.PROJECT_NOTE_FILE,
    tableName: TABLES.PROJECT_NOTE_FILE,
  }
)
