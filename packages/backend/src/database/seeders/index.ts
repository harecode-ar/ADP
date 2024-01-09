import colors from 'colors'
import { sequelize } from '..'
import logger from '../../logger'
import { areaSeed } from './area'
import { cacheSeed } from './cache'
import { projectSeed } from './project'
import { stageSeed } from './stage'
import { userSeed } from './user'
import { calculateAcp } from './average-completion'
import { configurationSeed } from './configuration'
import { permissionSeed } from './permission'
import { projectStateSeed } from './project-state'
import { rolePermissionSeed } from './role-permission'
import { roleSeed } from './role'
import { stageStateSeed } from './stage-state'
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
    await areaSeed({ transaction })
    await projectStateSeed({ transaction })
    await stageStateSeed({ transaction })
    await projectSeed({ transaction })
    await stageSeed({ transaction })
    await configurationSeed({ transaction })
    await cacheSeed({ transaction })
    await transaction.commit()
    await calculateAcp()
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
