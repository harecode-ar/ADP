import { IContact, IProject } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Card, Box, TextField, Button } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_PROJECT_CONTACTS } from 'src/graphql/queries'
import Iconify from 'src/components/iconify'
import ContactItem from './contact-item'
import ModalAddContact from './modal-add-contact'
import ModalImportContact from './modal-import-contact'

type TProps = {
  project: IProject
}

export default function ContactTab(props: TProps) {
  const { project } = props

  const [search, setSearch] = useState('')
  const modalAddContact = useBoolean()
  const modalImportContact = useBoolean()

  const { data, refetch } = useQuery(GET_PROJECT_CONTACTS, {
    variables: {
      id: project.id,
    },
  })

  const contacts: IContact[] = useMemo(() => {
    if (!data) return []
    return data.projectContacts
  }, [data])

  const filteredContacts = useMemo(() => {
    if (!search) return contacts
    return contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()))
  }, [contacts, search])

  return (
    <React.Fragment>
      <Card
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            placeholder="Buscar contacto"
            InputProps={{
              startAdornment: <Iconify icon="material-symbols:search" width={18} mr={1} />,
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={modalImportContact.onTrue}>
              <Iconify icon="uil:import" width={18} mr={1} />
              Importar contactos
            </Button>
            <Button variant="contained" color="primary" onClick={modalAddContact.onTrue}>
              <Iconify icon="ic:round-person-add" width={18} mr={1} />
              Agregar contacto
            </Button>
          </Box>
        </Box>
      </Card>
      {filteredContacts.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            color: 'text.disabled',
          }}
        >
          No hay contactos
        </Box>
      )}
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {filteredContacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} project={project} refetch={refetch} />
        ))}
      </Box>
      <ModalAddContact modal={modalAddContact} refetch={refetch} project={project} />
      {modalImportContact.value && (
        <ModalImportContact modal={modalImportContact} refetch={refetch} project={project} />
      )}
    </React.Fragment>
  )
}
