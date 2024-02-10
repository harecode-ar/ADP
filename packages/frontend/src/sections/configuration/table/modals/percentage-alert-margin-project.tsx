'use client'

import { EConfigurationKey } from '@adp/shared'
import React from 'react'
import { Typography, Button, Modal, Box, Grid, Backdrop, Slider } from '@mui/material'
import Iconify from 'src/components/iconify'
import { useFormik, FormikHelpers } from 'formik'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CONFIGURATION } from 'src/graphql/queries'
import { UPDATE_CONFIGURATIONS } from 'src/graphql/mutations'
import { useSnackbar } from 'src/components/snackbar'
import { useBoolean } from 'src/hooks/use-boolean'
import { DEFAULT_STYLE_MODAL } from 'src/constants'

type TProps = {
  modal: ReturnType<typeof useBoolean>
  refetch: () => void
}

type TFormikValues = {
  [EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT]: number
}

const marks = [
  { value: 0, label: '0%' },
  { value: 100, label: '100%' },
]

function valueLabelFormat(value: number) {
  return `${value}%`
}

export default function PercentageAlertMarginProjectModal(props: TProps) {
  const { modal, refetch } = props
  const { enqueueSnackbar } = useSnackbar()
  const [updateConfigurations] = useMutation(UPDATE_CONFIGURATIONS)

  const formik = useFormik({
    initialValues: {
      [EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT]: 0,
    } as TFormikValues,
    onSubmit: async (values, helpers: FormikHelpers<TFormikValues>) => {
      try {
        const { errors } = await updateConfigurations({
          variables: {
            input: [
              {
                key: EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT,
                value: String(values[EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT] / 100),
              },
            ],
          },
        })
        if (errors) throw new Error(errors[0].message)
        enqueueSnackbar('Configuración guardada correctamente.', { variant: 'success' })
        helpers.resetForm()
        modal.onFalse()
        refetch()
      } catch {
        enqueueSnackbar('La configuración no pudo ser guardada.', {
          variant: 'error',
        })
      }
    },
  })

  useQuery(GET_CONFIGURATION, {
    variables: {
      key: EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT,
    },
    onCompleted: (data) => {
      if (!data) return
      const { configuration = '0' } = data
      formik.setFieldValue(EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT, Number(configuration) * 100)
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
      <Box sx={DEFAULT_STYLE_MODAL}>
        <Typography id="modal-title" variant="h6" component="h2">
          Editar configuración
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={12}>
                <Slider
                  size="medium"
                  marks={marks}
                  min={0}
                  step={5}
                  max={100}
                  value={formik.values[EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT]}
                  onChange={(e, value) => {
                    formik.setFieldValue(EConfigurationKey.PERCENTAGE_ALERT_MARGIN_PROJECT, value)
                  }}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueLabelFormat}
                />
              </Grid>
              {/* buttons */}
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
                  >
                    <Iconify sx={{ mr: 1 }} icon="ic:baseline-cancel" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => {
                      formik.handleSubmit()
                    }}
                    color="primary"
                    variant="contained"
                  >
                    <Iconify sx={{ mr: 1 }} icon="mingcute:check-fill" />
                    Guardar
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
