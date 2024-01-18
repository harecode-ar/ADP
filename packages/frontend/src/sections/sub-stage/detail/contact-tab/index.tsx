import { IStage, IContact } from '@adp/shared'
import React, { useMemo, useState } from 'react'
import { Card, Box, TextField, Button, CardContent } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useBoolean } from 'src/hooks/use-boolean'
import { GET_STAGE_CONTACTS } from 'src/graphql/queries'
import Iconify from 'src/components/iconify'
import ContactItem from './contact-item'
import ModalAddContact from './modal-add-contact'
import ModalImportContact from './modal-import-contact'

type TProps = {
  subStage: IStage
}

export default function ContactTab(props: TProps) {
  const { subStage } = props

  const [search, setSearch] = useState('')
  const modalAddContact = useBoolean()
  const modalImportContact = useBoolean()

  const { data, refetch } = useQuery(GET_STAGE_CONTACTS, {
    variables: {
      id: subStage.id,
    },
  })

  const contacts: IContact[] = useMemo(() => {
    if (!data) return []
    return data.stageContacts
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
          mb: 2,
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
            style={{ marginRight: '10px' }}
          />
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={modalImportContact.onTrue}>
              <Iconify icon="uil:import" width={18} mr={1} />
              Importar
            </Button>
            <Button variant="contained" color="primary" onClick={modalAddContact.onTrue}>
              <Iconify icon="ic:round-person-add" width={18} mr={1} />
              Agregar
            </Button>
          </Box>
        </Box>
      </Card>
      <Card>
        <CardContent>
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
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
          >
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                subStage={subStage}
                refetch={refetch}
              />
            ))}
          </Box>
          <ModalAddContact modal={modalAddContact} refetch={refetch} subStage={subStage} />
          {modalImportContact.value && (
            <ModalImportContact modal={modalImportContact} refetch={refetch} stage={subStage} />
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
