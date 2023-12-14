import { IContact } from '@adp/shared'
import cron from 'node-cron'
import { Contact, User, Stage, Project } from '../database/models'

// Run every 24 hours
// Remove contacts that are not associated with any user, stage, or project
cron.schedule('0 0 * * *', async () => {
  const contacts = (await Contact.findAll({
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id'],
      },
      {
        model: Stage,
        as: 'stages',
        attributes: ['id'],
      },
      {
        model: Project,
        as: 'projects',
        attributes: ['id'],
      },
    ],
  })) as unknown as IContact[]

  const unusedContacts = contacts.filter(
    (contact) =>
      contact.users.length === 0 && contact.stages.length === 0 && contact.projects.length === 0
  )

  // @ts-ignore
  unusedContacts.forEach((contact) => contact.destroy())
})
