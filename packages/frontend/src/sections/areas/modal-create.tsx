'use client'

import React from 'react'
import {
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
  Backdrop,
} from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation } from '@apollo/client'
import { CREATE_AREA } from 'src/graphql/mutations'
import { paths } from 'src/routes/paths'
import * as Yup from 'yup'

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

const areaSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
}

const ModalCreate = (props: TProps) => {
  const router = useRouter()
  const [createArea] = useMutation(CREATE_AREA)
  const { modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      responsable: '',
    },
    onSubmit: async (
      values,
      helpers: FormikHelpers<{ name: string; description: string; responsable: string }>
    ) => {
      try {
        await createArea({
          variables: {
            name: values.name,
            description: values.description,
            rolename: 'prueba',
            multiple: false,
          },
        })
        enqueueSnackbar('Area creada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        router.push(paths.dashboard.root)
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El Area no pudo ser creada.', { variant: 'error' })
      }
    },
    validationSchema: areaSchema,
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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Nueva área
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                  id="responsable"
                  name="responsable"
                  label="Responsable"
                  variant="outlined"
                  fullWidth
                  value={formik.values.responsable}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={formik.values.description}
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
                  <Button onClick={modal.onFalse} color="primary" variant="outlined">
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()}>
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    Enviar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Typography>
      </Box>
    </Modal>
  )
}

export default ModalCreate
