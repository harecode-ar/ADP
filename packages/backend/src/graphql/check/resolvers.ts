import { PERMISSION_MAP } from '@adp/shared'
import type { ICheck, IChecklist} from '@adp/shared'
import { Check } from '../../database/models'
import logger from '../../logger'
import { needPermission } from '../../utils/auth'
import type { IContext } from '../types'

export default {
  Check: {
    checklist: (check: ICheck): Promise<IChecklist | null> => {
      if (check.checklist) return Promise.resolve(check.checklist)
      if (!check.checklistId) return Promise.resolve(null)
      return Check.findByPk(check.checklistId)
        .then((result) => (result ? result.get() : null))
        .catch((error) => {
          console.error('Error fetching checklist:', error)
          throw error
        })
    }
  },
  Query: {
    checks: (
      _: any,
      __: any,
      context: IContext
    ): Promise<Omit<ICheck, 'checklist'>[] | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECK_READ], context)
        return Check.findAll({
          order: [['createdAt', 'ASC']],
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    check: (
      _: any,
      args: Pick<ICheck, 'id'>,
      context: IContext
    ): Promise<Omit<ICheck, 'checklist'> | null> => {
      try {
        needPermission([PERMISSION_MAP.CHECK_READ], context)
        return Check.findByPk(args.id)
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
  Mutation: {
    createCheck: (
      _: any,
      args: Pick<ICheck, 'title' | 'checklistId'>,
      context: IContext
    ): Promise<Omit<ICheck, 'checklist'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECK_CREATE], context)
        const { title, checklistId } = args
        return Check.create({
          title,
          checklistId
        })
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    updateCheck: async (
      _: any,
      args: Pick<ICheck, 'id' | 'title' | 'checked' | 'checklistId'>,
      context: IContext
    ): Promise<Omit<ICheck, 'checklist'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECK_UPDATE], context)
        const { id, title, checked, checklistId } = args
        const check = await Check.findByPk(id)
        if (!check) {
          throw new Error('Check not found')
        }
        await check.update({
          title,
          checked,
          checklistId
        })
        return check
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
    deleteCheck: async (
      _: any,
      args: Pick<ICheck, 'id'>,
      context: IContext
    ): Promise<Omit<ICheck, 'checklist'>> => {
      try {
        needPermission([PERMISSION_MAP.CHECK_DELETE], context)
        const { id } = args
        const check = await Check.findByPk(id)
        if (!check) {
          throw new Error('Check not found')
        }
        await check.destroy()
        return check
      } catch (error) {
        logger.error(error)
        throw error
      }
    },
  },
}
