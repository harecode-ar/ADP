import React from 'react'
import * as Yup from 'yup'
import { Card, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@apollo/client'
import LoadingButton from '@mui/lab/LoadingButton'
import { CREATE_PROJECT_NOTE } from 'src/graphql/mutations'
import { IProject } from '@adp/shared'
import FormProvider, { RHFTextField } from 'src/components/hook-form'

// ----------------------------------------------------------------------
type TProps = {
  refetch: () => void
  project: IProject
}

export default function PostCommentForm(props: TProps) {
  const { project, refetch } = props
  const [createProjectNote] = useMutation(CREATE_PROJECT_NOTE)

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
      await createProjectNote({
        variables: {
          message: data.message,
          projectId: project.id,
        },
      })
      reset()
      refetch()
    } catch (error) {
      console.error(error)
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
