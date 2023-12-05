'use client'

import React, { useCallback } from 'react'
import { Typography, Button, Modal, Box, TextField, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CONTACT } from 'src/graphql/queries'
import { UPDATE_CONTACT } from 'src/graphql/mutations'
import * as Yup from 'yup'
import { fData } from 'src/utils/format-number'
import { UploadAvatar } from 'src/components/upload'
import { IContact } from '@adp/shared'
import { getStorageFileUrl } from 'src/utils/storage'

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

const userSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  phone: Yup.string().required('Telefono requerido'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  contact: IContact
}

type TFormikValues = {
  name: string
  phone: string
  file: File | null
  preview: string | null
}

export default function ModalUpdate(props: TProps) {
  const { modal, refetch, contact } = props

  const { loading: getContactLoading } = useQuery(GET_CONTACT, {
    variables: {
      id: contact.id,
    },
    onCompleted: (data: any) => {
      if (!data?.contact) return
      const values = {} as TFormikValues
      values.name = data.contact.name
      values.phone = data.contact.phone
      if (data.contact.image) values.preview = getStorageFileUrl(data.contact.image)
      formik.setValues(values)
    },
  })
  const [updateContact, { loading: updateContactLoading }] = useMutation(UPDATE_CONTACT)
  const { enqueueSnackbar } = useSnackbar()

  const loading = getContactLoading || updateContactLoading

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      file: null,
      preview: null,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await updateContact({
          variables: {
            id: contact.id,
            name: values.name,
            phone: values.phone,
            image: values.file,
          },
        })
        enqueueSnackbar('Contacto editado correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El contacto no pudo ser editado.', { variant: 'error' })
      }
    },
    validationSchema: userSchema,
  })

  const handleDropAvatar = useCallback(
    (acceptedFiles: (File | null)[]) => {
      const newFile = acceptedFiles[0]
      if (newFile) {
        formik.setFieldValue('file', newFile)
        formik.setFieldValue('preview', URL.createObjectURL(newFile))
      }
    },
    [formik]
  )

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
    >
      <Box sx={styleModal}>
        <Typography id="modal-title" variant="h6" component="h2">
          Editar contacto
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }}>
          <UploadAvatar
            file={formik.values.file}
            preview={formik.values.preview}
            onDrop={handleDropAvatar}
            validator={(fileData: File) => {
              if (fileData.size > 2000000) {
                return {
                  code: 'file-too-large',
                  message: `El archivo es muy grande, el tamaño máximo es de ${fData(2000000)}`,
                }
              }
              return null
            }}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                  marginBottom: 5,
                }}
              >
                Archivos *.jpeg, *.jpg, *.png
                <br /> Max {fData(2000000)}
              </Typography>
            }
          />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  name="name"
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.name}
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Telefono"
                  variant="outlined"
                  fullWidth
                  required
                  value={formik.values.phone}
                  error={Boolean(formik.errors.phone)}
                  helperText={formik.errors.phone}
                  onChange={formik.handleChange}
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
                    disabled={updateContactLoading}
                  >
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    {updateContactLoading ? 'Guardando...' : 'Guardar'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal >
  )
}
