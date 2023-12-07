'use client'

import type { ICheck } from '@adp/shared'
import React from 'react'
import {
  IconButton,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
  Backdrop,
  Checkbox,
  Stack,
  Tooltip,
} from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { uuidv4 } from 'src/utils/uuidv4'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { CREATE_CHECKLIST } from 'src/graphql/mutations'

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

const checklistSchema = Yup.object().shape({
  title: Yup.string().required('titulo requerido'),
  checks: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('titulo requerido'),
      checked: Yup.boolean().required('checked requerido'),
    })
  ),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
}

type TFormikValues = {
  title: string
  checks: TCheck[]
}

type TCheck = Pick<ICheck, 'title' | 'checked'> & {
  id: string
}

const CreateChecklistModal = (props: TProps) => {
  const { modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()
  const [createChecklist] = useMutation(CREATE_CHECKLIST)

  const formik = useFormik({
    initialValues: {
      title: '',
      checks: [],
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createChecklist({
          variables: {
            title: values.title,
            checks: values.checks,
          },
        })
        enqueueSnackbar('Listado de tareas creada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch (error) {
        console.error(error)
        enqueueSnackbar('El listado de tareas no pudo ser creado.', { variant: 'error' })
      }
    },
    validationSchema: checklistSchema,
  })
  const handleAddCheck = () => {
    const newCheck: TCheck = {
      id: uuidv4(),
      title: '',
      checked: false,
    }
    formik.setFieldValue('checks', [...formik.values.checks, newCheck])
  }

  const handleCheckedChange = (check: TCheck) => {
    const findIndex = formik.values.checks.findIndex((c) => c.id === check.id)
    if (findIndex === -1) return
    const newChecks = [...formik.values.checks]
    newChecks[findIndex] = { ...check, checked: !check.checked }
    formik.setFieldValue('checks', newChecks)
  }

  const handleTitleChange = (check: TCheck, value: string) => {
    const findIndex = formik.values.checks.findIndex((c) => c.id === check.id)
    if (findIndex === -1) return
    const newChecks = [...formik.values.checks]
    newChecks[findIndex] = { ...check, title: value }
    formik.setFieldValue('checks', newChecks)
  }

  const handleDeleteCheck = (check: TCheck) => {
    const newChecks = formik.values.checks.filter((c) => c.id !== check.id)
    formik.setFieldValue('checks', newChecks)
  }

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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              label="Titulo"
              variant="standard"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={!!formik.errors.title}
              helperText={formik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
                Tareas
              </Typography>
              <Tooltip title="Agregar nueva tarea">
                <IconButton onClick={handleAddCheck}>
                  <Iconify icon="mdi:plus" />
                </IconButton>
              </Tooltip>
            </Box>
            <Stack spacing={1}>
              {formik.values.checks.map((check) => (
                <Box key={check.id} display="flex" alignItems="center">
                  <Checkbox checked={check.checked} onChange={() => handleCheckedChange(check)} />
                  <TextField
                    placeholder="Escriba un titulo para la tarea"
                    variant="standard"
                    size="small"
                    fullWidth
                    value={check.title || ''}
                    onChange={(e) => handleTitleChange(check, e.target.value)}
                    error={!!formik.errors.checks}
                  />
                  <Tooltip title="Eliminar tarea">
                    <IconButton onClick={() => handleDeleteCheck(check)}>
                      <Iconify icon="mdi:delete" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ))}
            </Stack>
            {!!formik.errors.checks && (
              <Typography color="error" variant="caption">
                No puede haber tareas vacias
              </Typography>
            )}
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
                Crear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default CreateChecklistModal
