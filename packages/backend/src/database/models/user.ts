import { Model, DataTypes, Op } from 'sequelize'
import { sequelize } from '..'
import { TABLES } from '../../constants'

export class User extends Model {
  public id!: number

  public firstname!: string

  public lastname!: string

  public email!: string

  public telephone!: string

  public password!: string

  public image!: string

  public roleId!: number

  public createdAt!: Date

  public updatedAt!: Date

  public deletedAt!: Date | null
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    validate: {
      async uniqueUserEmail(this: User) {
        if (this.email) {
          const user = await User.findOne({
            where: {
              id: { [Op.ne]: this.id },
              email: this.email,
            },
          })
          if (user) {
            throw new Error('Ya existe un usuario con este correo electrónico')
          }
        }
      },
    },
    modelName: 'User',
    tableName: TABLES.USER,
    timestamps: true,
    paranoid: true,
  }
)
