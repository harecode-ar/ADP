'use client'

import type { ICheck, IProject } from '@adp/shared'
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
import Scrollbar from 'src/components/scrollbar'
import { useFormik, FormikHelpers } from 'formik'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSnackbar } from 'src/components/snackbar'
import { uuidv4 } from 'src/utils/uuidv4'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { CREATE_CHECKLIST } from 'src/graphql/mutations'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

const checklistSchema = Yup.object().shape({
  title: Yup.string().required('Título requerido'),
  checks: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Título requerido'),
      checked: Yup.boolean().required('Checked requerido'),
    })
  ),
})

type TProps = {
  modal: ReturnType<typeof useBoolean>
  project: IProject
  refetch: () => void
}

type TAssignation = {
  id: number
  name: string
  type: 'Proyecto' | 'Etapa' | 'Subetapa'
}

type TFormikValues = {
  title: string
  remember: boolean
  assignedTo: TAssignation | null
  checks: TCheck[]
}

type TCheck = Pick<ICheck, 'title' | 'checked'> & {
  id: string
}

export default function CreateChecklistModalTab(props: TProps) {
  const { modal, project, refetch } = props
  const { enqueueSnackbar } = useSnackbar()
  const [createChecklist, { loading }] = useMutation(CREATE_CHECKLIST)

  const formik = useFormik({
    initialValues: {
      title: '',
      remember: false,
      assignedTo: null as TAssignation | null,
      checks: [],
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        await createChecklist({
          variables: {
            title: values.title,
            remember: values.remember,
            projectId: Number(project.id),
            checks: values.checks.map((check) => ({
              title: check.title,
              checked: check.checked,
            })),
          },
        })
        enqueueSnackbar('Listado de tareas creada correctamente.', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch {
        enqueueSnackbar('El listado de tareas no pudo ser creado.', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        })
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
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={DEFAULT_STYLE_MODAL}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              label="Titulo"
              variant="standard"
              fullWidth
              multiline
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
            <Scrollbar sx={{ maxHeight: 300 }}>
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
            </Scrollbar>
          </Grid>
          <Grid item xs={12}>
            {!!formik.errors.checks && (
              <Typography
                color="error"
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 2,
                }}
              >
                No puede haber tareas vacias
              </Typography>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                marginTop: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Button
                  onClick={modal.onFalse}
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
