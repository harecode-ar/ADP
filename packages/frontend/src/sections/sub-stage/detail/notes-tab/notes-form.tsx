import type { IStage } from '@adp/shared'
import React from 'react'
import * as Yup from 'yup'
import { Card, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import LoadingButton from '@mui/lab/LoadingButton'
import { CREATE_STAGE_NOTE } from 'src/graphql/mutations'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import { enqueueSnackbar } from 'notistack'

// ----------------------------------------------------------------------
type TProps = {
  refetch: () => void
  subStage: IStage
}

export default function NotesForm(props: TProps) {
  const { subStage, refetch } = props
  const [createStageNote] = useMutation(CREATE_STAGE_NOTE)

  const CommentSchema = Yup.object().shape({
    message: Yup.string().required('mensaje requerido'),
  })

  const defaultValues = {
    message: '',
  }

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createStageNote({
        variables: {
          message: data.message,
          stageId: subStage.id,
        },
      })
      reset()
      refetch()
    } catch (error) {
      enqueueSnackbar(`La nota no pudo ser creada`, { variant: 'error' })
    }
  })

  return (
    <Card sx={{ p: 2 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RHFTextField
              name="message"
              placeholder="Escribe algun comentario..."
              multiline
              maxRows={5}
              InputProps={{
                endAdornment: (
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Publicar
                  </LoadingButton>
                ),
              }}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  )
}
