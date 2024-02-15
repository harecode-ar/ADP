'use client'

import { IProject, IUser } from '@adp/shared'
import React, { useMemo } from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { useMutation, useQuery } from '@apollo/client'
import * as Yup from 'yup'
import { DEFAULT_STYLE_MODAL } from 'src/constants'
import { logger } from 'src/utils/logger'
import UserPicker from 'src/components/user-picker'
import { USERS_FOR_SELECT } from 'src/graphql/queries'
import { CREATE_PROJECT_VIEWER } from 'src/graphql/mutations'

const validationSchema = Yup.object().shape({
  responsible: Yup.object().nullable().required('El responsable es requerido.'),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
  project: IProject
}

type TFormikValues = {
  responsible: IUser | null
}

export default function ModalAddVisualizer(props: TProps) {
  const { modal, refetch, project } = props

  const { enqueueSnackbar } = useSnackbar()

  const { data } = useQuery(USERS_FOR_SELECT)
  const [createProjectViewer, { loading }] = useMutation(CREATE_PROJECT_VIEWER)

  const users: Pick<IUser, 'id' | 'fullname'>[] = useMemo(() => {
    if (data?.users) return data.users
    return []
  }, [data])

  const formik = useFormik({
    initialValues: {
      responsible: null,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createProjectViewer({
          variables: {
            projectId: project.id,
            userId: values.responsible?.id,
          },
        })
        enqueueSnackbar('Visualizador creado correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        logger.error(error)
        enqueueSnackbar('El Visualizador no pudo ser creado.', { variant: 'error' })
      }
    },
    validationSchema,
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
      <Box sx={DEFAULT_STYLE_MODAL}>
        <Typography id="modal-title" variant="h6" component="h2">
          Agregar visualizador
        </Typography>
        <Box id="modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <UserPicker
                  users={users}
                  value={formik.values.responsible}
                  onChange={(_, value) => formik.setFieldValue('responsible', value)}
                  label="Responsable"
                  placeholder="Buscar responsible"
                  variant="outlined"
                  disabled={loading}
                  error={Boolean(formik.errors.responsible)}
                  helperText={formik.errors.responsible}
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
                    {loading ? 'Creando...' : 'Crear'}
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
