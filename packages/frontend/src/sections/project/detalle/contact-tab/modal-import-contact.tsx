'use client'

import { IContact, IProject } from '@adp/shared'
import React, { useMemo } from 'react'
import {
  Typography,
  Button,
  Modal,
  Box,
  Grid,
  Backdrop,
  Autocomplete,
  TextField,
} from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_CONTACTS } from 'src/graphql/queries'
import { IMPORT_USER_CONTACTS_TO_PROJECT } from 'src/graphql/mutations'

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  project: IProject
}

type TFormikValues = {
  contacts: IContact[]
}

export default function ModalImportContact(props: TProps) {
  const { modal, refetch, project } = props
  const contactQuery = useQuery(GET_USER_CONTACTS)
  const [importContacts, { loading }] = useMutation(IMPORT_USER_CONTACTS_TO_PROJECT)
  const { enqueueSnackbar } = useSnackbar()

  const contacts: IContact[] = useMemo(() => {
    if (!contactQuery.data) return []
    return contactQuery.data.userContacts || []
  }, [contactQuery.data])

  const formik = useFormik({
    initialValues: {
      contacts: [],
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        const contactIds = values.contacts.map((contact) => contact.id)
        const { errors } = await importContacts({
          variables: {
            projectId: project.id,
            contacts: contactIds,
          },
        })
        if (errors) throw new Error(errors[0].message)
        if (contactIds.length === 1) {
          enqueueSnackbar('Contacto importado correctamente.', { variant: 'success' })
        }
        if (contactIds.length > 1) {
          enqueueSnackbar('Contactos importados correctamente.', { variant: 'success' })
        }
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    },
  })

  return (
    <Modal
      open={modal.value}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-title" variant="h6" component="h2">
          Importar contactos
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={contacts}
                  getOptionLabel={(option) => option.name}
                  value={formik.values.contacts}
                  onChange={(e, value) => formik.setFieldValue('contacts', value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Contactos" placeholder="Buscar contacto" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Button
                    onClick={() => {
                      modal.onFalse()
                      formik.resetForm()
                    }}
                    color="primary"
                    variant="outlined"
                    disabled={loading}
                  >
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => formik.handleSubmit()}
                    disabled={loading}
                  >
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    {loading ? 'Importando...' : 'Importar'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
