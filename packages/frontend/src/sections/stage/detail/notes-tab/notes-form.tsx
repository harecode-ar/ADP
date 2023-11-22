import type { IStage } from '@adp/shared'
import React from 'react'
import * as Yup from 'yup'
import { Card, Stack } from '@mui/material'
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
  stage: IStage
}

export default function NotesForm(props: TProps) {
  const { stage, refetch } = props
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
          stageId: stage.id,
        },
      })
      reset()
      refetch()
    } catch (error) {
      console.error(error)
      enqueueSnackbar(`La nota no pudo ser creada`, { variant: 'error' })
    }
  })

  return (
    <Card sx={{ p: 2 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3}>
          <RHFTextField
            name="message"
            placeholder="Escribe algun comentario..."
            multiline
            maxRows={10}
            rows={4}
          />

          <Stack direction="row" alignItems="center" justifyContent="end">
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Publicar
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Card>
  )
}
