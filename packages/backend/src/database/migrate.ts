import colors from 'colors'
import { sequelize } from './index'
import './models'
import { wait } from '../utils/wait'

const migrate = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.drop()
    await sequelize.sync({ alter: true })
    // eslint-disable-next-line no-console
    console.log(colors.green('Seeding complete'))
    await wait(100)
    process.exit(0)
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(colors.red('Seeding failed'), error?.name || 'unknown error')
    await wait(100)
    process.exit(1)
  }
}

migrate()
