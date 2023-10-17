import colors from 'colors'
import { sequelize } from '..'
import logger from '../../logger'
import { roleSeed } from './role'
import { permissionSeed } from './permission'
import { rolePermissionSeed } from './role-permission'
import { userSeed } from './user'
import { wait } from '../../utils/wait'

const seed = async () => {
  const transaction = await sequelize.transaction()
  try {
    await sequelize.sync({ force: true })
    // eslint-disable-next-line no-console
    console.log(colors.green('Migration complete'))
    const roles = await roleSeed({ transaction })
    const permissions = await permissionSeed({ transaction })
    await rolePermissionSeed({ transaction, roles, permissions })
    await userSeed({ transaction, roles })

    await transaction.commit()
    // eslint-disable-next-line no-console
    console.log(colors.green('Seeding complete'))
    await wait(100)
    process.exit(0)
  } catch (error: any) {
    await transaction.rollback()
    logger.error(error)
    // eslint-disable-next-line no-console
    console.log(colors.red('Seeding failed'), error?.name || 'unknown error')
    await wait(100)
    process.exit(1)
  }
}

seed()
